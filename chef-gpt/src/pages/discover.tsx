import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../components/types";
import Navigation from "../components/Navigation";
import Foodpost from "../components/foodpost";
import "../css/theme.css";
import "../css/discover.css";
import { getRequest } from "../utils/services";
import LottieLoading from "../components/LottieLoading";

function Discover() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const fetchDiscoverData = async () => {
    try {
      const [data] = await Promise.all([
        getRequest(`/random`),
        new Promise((resolve) => setTimeout(resolve, 2000)), // 2-second timeout
      ]);

      setRecipes(data);
    } catch (error) {
      console.error("ERROR WHILE FETCHING DATA", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDiscoverData();
  }, [location]);

  return (
    <>
      <Navigation></Navigation>
      <div className="discover-container">
        {isLoading ? (
          <div className="discover">
            <LottieLoading></LottieLoading>
          </div>
        ) : (
          <div className="discover">
            <Foodpost></Foodpost>
            <h1>HEREE EEEE</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Discover;
