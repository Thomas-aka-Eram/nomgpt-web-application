import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../components/types";
import Navigation from "../components/Navigation";
import Filter from "../components/filter";
import Foodpost from "../components/foodpost";
import FoodDetails from "../components/fooddetails";
import "../css/theme.css";
import "../css/discover.css";
import { getRequest, postRequest } from "../utils/services";
import LottieLoading from "../components/LottieLoading";

function Discover() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState({
    ingredients: [],
    diet: [],
    health: [],
    cuisine: "",
    mealType: "",
    dishType: "",
    calories: "",
    time: "",
    excluded: [],
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [hasMore, setHasMore] = useState(true); // Track if there is more data
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchDiscoverData = async () => {
    try {
      setIsLoading(true);
      setSelectedRecipe(null);
      let data;

      if (
        Object.values(filters).every(
          (value) =>
            (Array.isArray(value) && value.length === 0) || // Check for empty arrays
            (typeof value === "string" && value.trim() === "") // Check for empty strings
        )
      ) {
        // Fetch random recipes if no filters
        data = await getRequest(`/random`);
      } else {
        // Fetch filtered recipes
        data = await postRequest(`/filter`, filters);
      }

      if (data.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setRecipes((prev) => [...prev, ...data]); // Append the new data to the existing list
      }
    } catch (error) {
      console.error("ERROR WHILE FETCHING DATA", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleObserver = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasMore && !isLoading) {
      fetchDiscoverData();
    }
  };

  useEffect(() => {
    // Create the IntersectionObserver
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px",
      threshold: 1.0, // Trigger when the last item is fully visible
    });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current); // Observe the last item
    }

    // Cleanup observer on component unmount
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    setRecipes([]); // Reset recipes on filters change
    setHasMore(true); // Reset "hasMore" when filters change
    fetchDiscoverData();
  }, [location, filters]); // Fetch data whenever location or filters change

  return (
    <>
      <Navigation></Navigation>
      <div className="discover-container">
        <Filter setFilters={setFilters}></Filter>
        <div className="discover-body">
          <div className={selectedRecipe ? `discover ovhid` : `discover `}>
            {isLoading && recipes.length === 0 ? (
              <div className="discover-loading">
                <LottieLoading />
              </div>
            ) : (
              <>
                {selectedRecipe ? (
                  <div className="selected-recipe">
                    <div className="selected-container">
                      <FoodDetails recipedata={selectedRecipe} />
                      <button
                        className="back-button"
                        onClick={() => setSelectedRecipe(null)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {recipes ? (
                  recipes.map((recipe, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedRecipe(recipe)}
                      className="recipe-item"
                    >
                      <Foodpost recipedata={recipe} />
                    </div>
                  ))
                ) : (
                  <>
                    <h1>NO DATA</h1>
                  </>
                )}

                {hasMore && (
                  <div ref={lastItemRef} style={{ height: "20px" }} />
                )}
                {isLoading && (
                  <div className="more-loading">
                    <LottieLoading></LottieLoading>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;
