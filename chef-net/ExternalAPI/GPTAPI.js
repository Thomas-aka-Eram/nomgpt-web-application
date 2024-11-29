const { exec } = require("child_process");

const generateRecipe = (ingredients) => {
    return new Promise((resolve, reject) => {
        // Call the Python script with ingredients as arguments
        const command = `python3.10 generate_recipe.py ${ingredients.join(" ")}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error: ${error.message}`);
            }
            if (stderr) {
                return reject(`Stderr: ${stderr}`);
            }
            resolve(stdout.trim());
        });
    });
};

// Example usage
const ingredients = ["macaroni", "butter", "salt", "bacon"];
generateRecipe(ingredients)
    .then((result) => console.log("Generated Recipe:", result))
    .catch((error) => console.error(error));
