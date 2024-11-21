const express = require("express");
const { fetchRecipes, fetchrandomRecipes, fetchFilterRecipes } = require("../ExternalAPI/EdamamAPI"); // Destructure the functions
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, world!");
});

// POST endpoint for fetching recipes based on ingredients
router.post("/recipes", fetchRecipes);

// GET endpoint for fetching random recipes
router.get("/random", fetchrandomRecipes);

// POST end point for filtering recipes
router.post("/filter", fetchFilterRecipes)

module.exports = router;
