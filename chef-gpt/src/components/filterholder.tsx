import React, { useState } from "react";
import "../css/filter.css";
interface FilterProps {
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}
const Filter: React.FC<FilterProps> = ({ setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    ingredients: [],
    diet: [],
    health: [],
    cuisine: "",
    mealType: "",
    dishType: "",
    calories: "",
    time: "",
    excluded: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(localFilters.ingredients);
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const values = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setLocalFilters((prev: any) => ({
      ...prev,
      [name]: values,
    }));
  };
  const handleSubmit = () => {
    // Pass local filters to parent component
    setFilters(localFilters);
  };
  return (
    <>
      <div className="filter-container">
        <h2>Filter Recipes</h2>

        <div className="filter-group">
          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={localFilters.ingredients}
            onChange={handleInputChange}
            placeholder="e.g., chicken, rice"
          />
        </div>

        <div className="filter-group">
          <label>Diet</label>
          <select name="diet" multiple onChange={handleMultiSelectChange}>
            <option value="low-carb">Low-Carb</option>
            <option value="high-protein">High-Protein</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Health</label>
          <select name="health" multiple onChange={handleMultiSelectChange}>
            <option value="gluten-free">Gluten-Free</option>
            <option value="dairy-free">Dairy-Free</option>
            <option value="peanut-free">Peanut-Free</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Cuisine</label>
          <select name="cuisine" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Italian">Italian</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Meal Type</label>
          <select name="mealType" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Dish Type</label>
          <select name="dishType" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="Main course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Calories (e.g., 200-500)</label>
          <input
            type="text"
            name="calories"
            value={localFilters.calories}
            onChange={handleInputChange}
            placeholder="200-500"
          />
        </div>

        <div className="filter-group">
          <label>Time (e.g., 10-30 mins)</label>
          <input
            type="text"
            name="time"
            value={localFilters.time}
            onChange={handleInputChange}
            placeholder="10-30"
          />
        </div>

        <div className="filter-group">
          <label>Excluded Ingredients</label>
          <input
            type="text"
            name="excluded"
            value={localFilters.excluded}
            onChange={handleInputChange}
            placeholder="e.g., peanuts, eggs"
          />
        </div>

        <button onClick={handleSubmit}>Search Recipes</button>
      </div>
    </>
  );
};

export default Filter;
