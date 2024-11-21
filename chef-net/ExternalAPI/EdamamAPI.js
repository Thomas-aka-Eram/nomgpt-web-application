const express = require("express");
const axios = require("axios");
require("dotenv").config();

const EDAMAM_URL = "https://api.edamam.com/api/recipes/v2";
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
const GPT_API_KEY = process.env.GPT_APP_KEY;

// Random recipes to describe on the home page
const fetchrandomRecipes = async (req, res) => {
    try {
        const response = await axios.get(
            `${EDAMAM_URL}?type=public&q=dinner&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&random=true`
        );

        // Limit to 5 random recipes
        const randomRecipes = response.data.hits.slice(0, 20);
        res.json(randomRecipes);
    } catch (error) {
        console.error("Error fetching random recipes:", error.message);
        res.status(500).json({ error: "Failed to fetch random recipes" });
    }
};

// Fetch recipes based on ingredients
const fetchRecipes = async (req, res) => {
    try {
        const { ingredients } = req.body;

        // Ensure ingredients array is provided
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ error: "Ingredients array is required" });
        }

        const query = encodeURIComponent(ingredients.join(","));
        const response = await axios.get(
            `${EDAMAM_URL}?type=public&from=0&to=5&q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );

        const recipes = response.data.hits;
        if (recipes.length === 0) {
            return res.status(404).json({ message: "No recipes found for the given ingredients." });
        }

        const limitedData = recipes.slice(0, 2);
        res.json(limitedData);
    } catch (error) {
        console.error("Error fetching recipes:", error.message);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
};

const fetchFilterRecipes = async (req, res) => {
    console.log(req.body);
    try {
        const {
            ingredients = [],
            diet = [],
            health = [],
            cuisine = [],
            mealType = [],
            dishType = [],
            calories,
            time,
            excluded = [],
        } = req.body;

        // Normalize all fields to arrays
        const normalizedCuisine = Array.isArray(cuisine) ? cuisine : [cuisine].filter(Boolean);
        const normalizedDiet = Array.isArray(diet) ? diet : [diet].filter(Boolean);
        const normalizedHealth = Array.isArray(health) ? health : [health].filter(Boolean);
        const normalizedMealType = Array.isArray(mealType) ? mealType : [mealType].filter(Boolean);
        const normalizedDishType = Array.isArray(dishType) ? dishType : [dishType].filter(Boolean);
        const normalizedExcluded = Array.isArray(excluded) ? excluded : [excluded].filter(Boolean);

        // Start building the query string
        let queryParams = new URLSearchParams();

        // Add ingredients
        const normalizedIngredients = Array.isArray(ingredients)
            ? ingredients
            : ingredients.split(",").map((item) => item.trim());
        if (normalizedIngredients.length > 0) {
            queryParams.append("q", normalizedIngredients.join(","));
        }

        // Add normalized fields to the query
        normalizedCuisine.forEach((c) => queryParams.append("cuisineType", c));
        normalizedDiet.forEach((d) => queryParams.append("diet", d));
        normalizedHealth.forEach((h) => queryParams.append("health", h));
        normalizedMealType.forEach((m) => queryParams.append("mealType", m));
        normalizedDishType.forEach((d) => queryParams.append("dishType", d));
        normalizedExcluded.forEach((e) => queryParams.append("excluded", e));

        // Add calories range (e.g., "200-500")
        if (calories) {
            queryParams.append("calories", calories);
        }

        // Add time range (e.g., "10-30")
        if (time) {
            queryParams.append("time", time);
        }

        // Append mandatory API credentials
        queryParams.append("type", "public");
        queryParams.append("app_id", process.env.EDAMAM_APP_ID);
        queryParams.append("app_key", process.env.EDAMAM_APP_KEY);

        // Build the full URL
        const url = `https://api.edamam.com/api/recipes/v2?${queryParams.toString()}`;

        // Fetch data from Edamam API
        const response = await axios.get(url);
        const filterRecipes = response.data.hits.slice(0, 20);

        res.status(200).json(filterRecipes);
    } catch (error) {
        console.error("Error while fetching filter recipes: ", error.message);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
};




module.exports = { fetchRecipes, fetchrandomRecipes, fetchFilterRecipes };
