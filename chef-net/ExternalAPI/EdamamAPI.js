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
        const randomRecipes = response.data.hits.slice(0, 5);
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

module.exports = { fetchRecipes, fetchrandomRecipes };
