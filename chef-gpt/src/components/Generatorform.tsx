import React, { useState, useEffect } from "react";
import kitchen_tools from "../assets/kitchentool.json";
import ingredientsData from "../assets/ingredients.json";
import ToggleSwitch from "./toggleswitch";

interface GenerateProps {
  setGenerateRecipe: React.Dispatch<React.SetStateAction<any>>;
}

const GeneratorForm: React.FC<GenerateProps> = ({ setGenerateRecipe }) => {
  const [kitchenTools, setKitchenTools] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([
    "Cheese",
    "Tomato",
  ]);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSuggestions(ingredientsData.availableIngredients);
  }, []);

  const addIngredient = (item: string) => {
    setIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    setInputValue(""); // Clear the input
    setSuggestions(ingredientsData.availableIngredients); // Reset suggestions
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addIngredient(inputValue);
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredSuggestions = ingredientsData.availableIngredients.filter(
      (item) =>
        item.toLowerCase().includes(value.toLowerCase()) &&
        !ingredients.includes(item)
    );
    setSuggestions(filteredSuggestions);
  };

  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  const toggleTool = (tool: string) => {
    setKitchenTools(
      (prev) =>
        prev.includes(tool)
          ? prev.filter((t) => t !== tool) // Remove tool if selected
          : [...prev, tool] // Add tool if not selected
    );
  };

  return (
    <div className="generator-form">
      <div className="add-ingredients">
        <div className="ingre-intro">
          <h2 className="no-box">1</h2>
          <h3>Add Ingredients</h3>
          <p>
            You can pick ingredients from the list or from your saved inventory.
          </p>
          <p>
            Remember: if an ingredient is not available in the default list,
            simply type its name in the search bar and add it.
          </p>
        </div>
        <div className="ingre-input">
          <div className="input-items">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-tag">
                {item}{" "}
                <button
                  className="remove-btn"
                  onClick={() => removeIngredient(item)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              name="addingre"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Search or add Ingredient"
            />

            <div className="suggestion-dropdown">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => addIngredient(item)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontWeight: ingredients.includes(item) ? "" : "normal",
                    backgroundColor: ingredients.includes(item)
                      ? "#e0ffe0"
                      : "#fff",
                  }}
                >
                  {item}
                  {ingredients.includes(item) && <span>✔</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tools">
        <div className="add-kitchen">
          <div className="kitchen-intro">
            <h2 className="no-box">2</h2>
            <h3>Select the Kitchen tools you have.</h3>
            <p>Pick the kitchen utensils you have or you want to use.</p>
          </div>
          <div className="tools">
            {kitchen_tools.kitchen_tools.map((tool, index) => (
              <ToggleSwitch
                key={index}
                label={tool}
                isOn={kitchenTools.includes(tool)}
                onToggle={() => toggleTool(tool)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="Generate">
        <div className="generate-intro">
          <h2 className="no-box">3</h2>
          <h3>Generate</h3>
          <p>Press the Generate button and wait for the magic to happen.</p>
          <p>
            With one click you can save your Recipe in the Cookbook or add it to
            the Shopping List. And if you want to order the ingredients online,
            you can add all the ingredients to your AmazonFresh or InstaCart
            shopping cart too!
          </p>
        </div>
        <div className="generate-button">
          <button>Generate Your Recipe✨</button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorForm;
