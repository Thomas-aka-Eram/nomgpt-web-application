import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../components/types";
import Navigation from "../components/Navigation";
import Filter from "../components/filter";
import Foodpost from "../components/foodpost";
import "../css/theme.css";
import "../css/discover.css";
import { getRequest, postRequest } from "../utils/services";
import LottieLoading from "../components/LottieLoading";

function Discover() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const fetchDiscoverData = async () => {
    console.log(filters, "BEFORE fetching");
    try {
      if (Object.keys(filters).length === 0) {
        const [data] = await Promise.all([
          getRequest(`/random`),
          new Promise((resolve) => setTimeout(resolve, 2000)), // 2-second timeout
        ]);
        setRecipes(data);
      } else {
        const [data] = await Promise.all([
          postRequest(`/filter`, filters),
          new Promise((resolve) => setTimeout(resolve, 2000)), // 2-second timeout
        ]);
        console.log(data, "FETCHING WITH FILTER");
        setRecipes(data);
      }
    } catch (error) {
      console.error("ERROR WHILE FETCHING DATA", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDiscoverData();
  }, [location, filters]);

  return (
    <>
      <Navigation></Navigation>
      <div className="discover-container">
        <Filter setFilters={setFilters}></Filter>
        <div className="discover">
          {isLoading ? (
            <div className="discover-loading">
              <LottieLoading></LottieLoading>
            </div>
          ) : (
            <>
              {recipes.map((recipe, index) => (
                <Foodpost key={index} recipedata={recipe} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Discover;
