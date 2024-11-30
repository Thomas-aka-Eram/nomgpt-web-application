import React, { useState, useEffect } from "react";
import ingredientsData from "../assets/ingredients.json";
import "../css/itemselector.css";

const ItemSelector: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Load data from JSON file
    setSuggestions(ingredientsData.availableIngredients);
  }, []);

  // Add or remove ingredient
  const addIngredient = (item: string) => {
    setIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    setInputValue(""); // Clear the input
    setSuggestions(ingredientsData.availableIngredients); // Reset suggestions
  };

  // Handle input change
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

  // Remove ingredient
  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className="ingredient-selector">
      <div className="input-items">
        {ingredients.map((item, index) => (
          <div key={index} className="ingredient-tag">
            {item}{" "}
            <button
              className="remove-btn"
              onClick={() => removeIngredient(item)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        name="addingre"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search or add Ingredient"
      />

      {inputValue && (
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
      )}
    </div>
  );
};

export default ItemSelector;
