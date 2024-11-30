import React, { useState } from "react";
import Navigation from "../components/Navigation";
import "../css/theme.css";
import "../css/generate.css";
import { GeneratedRecipe } from "../components/types";
import GeneratorForm from "../components/Generatorform";

function Generate() {
  const [generateRecipe, setGenerateRecipe] = useState<GeneratedRecipe[]>([]);
  return (
    <>
      <Navigation></Navigation>
      <div className="generate-container">
        <div className="generate">
          <GeneratorForm setGenerateRecipe={setGenerateRecipe}></GeneratorForm>
        </div>
      </div>
    </>
  );
}

export default Generate;
