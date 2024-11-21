import React from "react";
import { useState, useEffect } from "react";
import { Recipe } from "./types";
import "../css/foodpost.css";

interface FoodpostProps {
  recipedata: Recipe;
}

const Foodpost: React.FC<FoodpostProps> = ({ recipedata }) => {
  return (
    <div className="foodpost-container">
      <div className="foodpost">
        <div className="postimg">
          <img src={recipedata.recipe.images.REGULAR.url} alt="" />
        </div>
        <div className="postinfo">
          <h2>{recipedata.recipe.label}</h2>
          <h3>Total Calories: {recipedata.recipe.calories.toFixed(0)} kcl</h3>
          <h4>Cuisine: {recipedata.recipe.cuisineType}</h4>
          <h4>Dish Type: {recipedata.recipe.dishType}</h4>
          <h5>Soruce: {recipedata.recipe.source}</h5>
        </div>
      </div>
    </div>
  );
};

export default Foodpost;
