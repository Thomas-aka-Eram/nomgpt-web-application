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

  const handleEnter = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Enter") {
    }
  };

  const handleSubmit = () => {
    // Pass local filters to parent component
    setFilters(localFilters);
  };
  return (
    <>
      <div className="filter-container">
        <h2>Filter Recipes</h2>
        <div className="filtertv">
          <ul>
            {Object.entries(localFilters)
              .filter(([key, value]) => {
                // Exclude empty or default values
                if (Array.isArray(value)) return value.length > 0; // Check arrays
                return value; // Check strings or numbers
              })
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {Array.isArray(value) ? value.join(", ") : value.toString()}
                </li>
              ))}
          </ul>
        </div>
        <div className="filter">
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
            <label>Excluded Ingredients</label>
            <input
              type="text"
              name="excluded"
              value={localFilters.excluded}
              onChange={handleInputChange}
              placeholder="e.g., peanuts, eggs"
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Search Recipes</button>
      </div>
    </>
  );
};

export default Filter;
