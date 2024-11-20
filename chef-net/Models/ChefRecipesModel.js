const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        ingredients: { type: [mongoose.Schema.Types.Array], required: true },
        instruction: { type: String, required: true },
        duration: { type: Boolean, required: true },
        analyze: { type: [mongoose.Schema.Types.Array], required: false },
        userName: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

const chefrecipeModel = mongoose.model("ChefRecipe", recipeSchema);
module.exports = chefrecipeModel;