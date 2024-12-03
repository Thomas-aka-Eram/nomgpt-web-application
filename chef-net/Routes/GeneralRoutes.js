import express from "express";
import { registerUser, loginUser, requireAuth, googleAuth, getUserData } from "../Controllers/UserController.js";
import { fetchRecipes, fetchrandomRecipes, fetchFilterRecipes } from "../ExternalAPI/EdamamAPI.js";
import { fetchGeneratedRecipe } from "../ExternalAPI/T5Generator.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, world!");
});

//Protected Route
router.get("/protected", requireAuth, (req, res) => {
    res.send("You are unauthorized")
})

// POST endpoint for fetching recipes based on ingredients
router.post("/recipes", fetchRecipes);

// GET endpoint for fetching random recipes
router.get("/random", fetchrandomRecipes);

// POST endpoint for filtering recipes
router.post("/filter", fetchFilterRecipes);

//POST endpoint to generate with T5RecipeGenerator AI
router.post("/generate", fetchGeneratedRecipe);

//POST endpoint to register new user
router.post("/register", registerUser);

//POST endpoint for google registeration
router.post("/google", googleAuth)

//POST endpoint to login user
router.post("/login", loginUser);

//GET endpoint for fetching userdata 
router.get("/userdata", getUserData)


export default router;
