import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import "../css/theme.css";
import "../css/generate.css";
import { postRequest } from "../utils/services";
import { GeneratedRecipe } from "../components/types";
import GeneratorForm from "../components/Generatorform";
import LottieLoading from "../components/LottieLoading";
import Layout from "../components/Layout";

function Generate() {
  const [generateRecipe, setGenerateRecipe] = useState<{
    ingredients: string[];
    kitchenTools: string[];
    time?: string;
  }>({
    ingredients: [],
    kitchenTools: [],
  });

  const [generatedData, setGeneratedData] = useState<null | GeneratedRecipe>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeneratedData = async () => {
    try {
      setLoading(true);
      setError(null);

      const requestBody = {
        items: generateRecipe.ingredients,
        kitchen_tools: generateRecipe.kitchenTools,
        time: generateRecipe.time || null,
      };

      const response = await postRequest("/generate", requestBody);
      setGeneratedData(response);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Trigger API call only when both ingredients and kitchen tools are available
    if (
      generateRecipe.ingredients.length > 0 ||
      generateRecipe.kitchenTools.length > 0
    ) {
      fetchGeneratedData();
    }
  }, [generateRecipe]);

  return (
    <Layout>
      <div className="generate-container">
        <div className="generate">
          <GeneratorForm
            setGenerateRecipe={setGenerateRecipe}
            isLoading={loading}
          />
        </div>

        <div className="generated-data">
          {loading && (
            <div className="loading-spinner">
              <LottieLoading></LottieLoading>
            </div>
          )}{" "}
          {error && <div className="error-message">{error}</div>}
          {generatedData && !loading && (
            <div className="generated-recipe">
              <h2>{generatedData.recipe.Title}</h2>
              <h3>
                Ingredients: <p>{generatedData.recipe.Ingredients}</p>
              </h3>
              <h3>Instructions:</h3>
              <ul>
                {generatedData.recipe.Directions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <span>
                The AI is still in the development process.
                <br /> It may make mistakes.
              </span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Generate;
