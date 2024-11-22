import React, { useState } from "react";
import filterOptions from "../assets/filterdata.json";
import { LocalFilters } from "./types";
import "../css/filter.css";

interface FilterProps {
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Filter: React.FC<FilterProps> = ({ setFilters }) => {
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
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
  const [currentInputs, setCurrentInputs] = useState({
    ingredients: "",
    excluded: "",
  });

  const [timeRange, setTimeRange] = useState(1); // Single range value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { name } = e.currentTarget;
      if (currentInputs[name as keyof typeof currentInputs].trim() !== "") {
        setLocalFilters((prev) => ({
          ...prev,
          [name]: [
            ...(prev[name as keyof typeof localFilters] as string[]),
            currentInputs[name as keyof typeof currentInputs].trim(),
          ],
        }));
        setCurrentInputs((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleCheckboxChange = <T extends keyof LocalFilters>(
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name as T]: checked
        ? [...(prev[name as T] as string[]), value]
        : (prev[name as T] as string[]).filter((item) => item !== value),
    }));
  };

  const handleDeleteItem = (filterKey: string, item: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterKey]: (
        prev[filterKey as keyof typeof localFilters] as string[]
      ).filter((i) => i !== item),
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(parseInt(e.target.value)); // Set the time range value
  };

  const handleSubmit = () => {
    setFilters({ ...localFilters, time: `>${timeRange}` }); // Fetch data greater than the selected time value
  };

  return (
    <div className="filter-container">
      <h2>Filter Recipes</h2>
      <div className="filter">
        <div className="filter-group">
          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={currentInputs.ingredients}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., chicken, rice"
          />
          <ul>
            {localFilters.ingredients.map((ingredient) => (
              <li key={ingredient}>
                {ingredient}
                <button
                  onClick={() => handleDeleteItem("ingredients", ingredient)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>

        {Object.keys(filterOptions).map((key) => {
          const filterKey = key.replace("filter-", "");
          return (
            <div key={key} className="filter-group">
              <label>
                {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
              </label>
              <div className="filterbox">
                {(
                  filterOptions[key as keyof typeof filterOptions] as string[]
                ).map((option) => (
                  <div key={option}>
                    <input
                      id={`${option}`}
                      type="checkbox"
                      name={filterKey}
                      value={option}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="filter-group">
          <label>Excluded Ingredients</label>
          <input
            type="text"
            name="excluded"
            value={currentInputs.excluded}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., peanuts, eggs"
          />
        </div>

        <div className="time-input-container">
          <label>Time Duration (Minutes):</label>
          <div className="time-range-picker">
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={timeRange}
              onChange={handleTimeChange}
              className="range-input"
            />
            <div className="time-values">
              <span>Min: 0</span>
              <span>Max: 100</span>
            </div>
          </div>
          <div className="selected-time">
            <span>Selected Time: {timeRange} min</span>
          </div>
        </div>

        <button onClick={handleSubmit}>Search Recipes</button>
      </div>
    </div>
  );
};

export default Filter;
