const express = require("express");
const { fetchRecipes, fetchrandomRecipes } = require("../ExternalAPI/EdamamAPI"); // Destructure the functions
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, world!");
});

// POST endpoint for fetching recipes based on ingredients
router.post("/recipes", fetchRecipes);

// POST endpoint for fetching random recipes
router.get("/random", fetchrandomRecipes);

module.exports = router;
