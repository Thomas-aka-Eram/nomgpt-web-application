import React, { useState, useRef, useEffect } from "react";
import { Recipe } from "./types";
import "../css/fooddetails.css";

interface FoodpostProps {
  recipedata: Recipe;
}

const FoodDetails: React.FC<FoodpostProps> = ({ recipedata }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScrollableHeight = scrollHeight - clientHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (content) {
        content.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="fooddetails-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        <div className="fooddetails" ref={contentRef}>
          <div className="recipe-info">
            <div className="food-overview">
              <h1 className="recipe-title">{recipedata.recipe.label}</h1>
              <p className="recipe-source">
                Source:{" "}
                <a
                  href={recipedata.recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {recipedata.recipe.source}
                </a>
              </p>
              <h2>Ingredients</h2>
              <ul className="recipe-ingredients">
                {recipedata.recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <h2>Nutritional Information</h2>
              <p>
                <strong>Calories:</strong>{" "}
                {Math.round(recipedata.recipe.calories)} kcal
                <br />
                <strong>Total Weight:</strong>{" "}
                {Math.round(recipedata.recipe.totalWeight)} g<br />
                <strong>Total Time:</strong> {recipedata.recipe.totalTime}{" "}
                minutes
                <br />
                <strong>CO2 Emissions:</strong>{" "}
                {recipedata.recipe.totalCO2Emissions} g
              </p>
              <div className="foods">
                <h2>Labels</h2>
                <p>
                  <strong>Diet Labels:</strong>{" "}
                  {recipedata.recipe.dietLabels.join(", ")}
                </p>
                <p>
                  <strong>Health Labels:</strong>{" "}
                  {recipedata.recipe.healthLabels.join(", ")}
                </p>
                <p>
                  <strong>Cautions:</strong>{" "}
                  {recipedata.recipe.cautions.join(", ") || "None"}
                </p>
              </div>
            </div>
            <div className="foodimage-container">
              <div className="foodimage">
                <img
                  src={recipedata.recipe.images.REGULAR.url}
                  alt={recipedata.recipe.label}
                />
              </div>
              <div className="label-container"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
