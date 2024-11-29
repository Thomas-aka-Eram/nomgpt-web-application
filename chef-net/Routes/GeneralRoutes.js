import express from "express";
import { fetchRecipes, fetchrandomRecipes, fetchFilterRecipes } from "../ExternalAPI/EdamamAPI.js"; // Note the .js extension
import { fetchGeneratedRecipe } from "../ExternalAPI/T5Generator.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, world!");
});

// POST endpoint for fetching recipes based on ingredients
router.post("/recipes", fetchRecipes);

// GET endpoint for fetching random recipes
router.get("/random", fetchrandomRecipes);

// POST endpoint for filtering recipes
router.post("/filter", fetchFilterRecipes);

router.post("/generate", fetchGeneratedRecipe);

export default router;
