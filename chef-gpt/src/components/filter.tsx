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

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input submission with "Enter"
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { name } = e.currentTarget;
      const trimmedValue =
        currentInputs[name as keyof typeof currentInputs].trim();
      if (trimmedValue !== "") {
        setLocalFilters((prev) => ({
          ...prev,
          [name]: [
            ...(prev[name as keyof typeof localFilters] as string[]),
            trimmedValue,
          ],
        }));
        setCurrentInputs((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  // Handle checkbox change for dropdown filters
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

  // Remove selected filter item
  const handleDeleteItem = (filterKey: keyof LocalFilters, item: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterKey]: (prev[filterKey] as string[]).filter((i) => i !== item),
    }));
  };

  // Toggle dropdown visibility
  // const toggleDropdown = (key: string) => {
  //   setDropdownState((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };
  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Submit filters
  const handleSubmit = () => {
    setFilters({ ...localFilters });
  };

  const handleCancle = () => {
    setLocalFilters({
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

    setOpenDropdown(() => null);
  };

  return (
    <div className="filter-container">
      <h2>Filter Recipes</h2>
      <div className="filter">
        {/* Ingredients Input */}
        <div className="filter-group">
          <ul className="selected-items">
            {localFilters.ingredients.map((ingredient) => (
              <li key={ingredient} className="selected-item">
                {ingredient}
                <button
                  className="remove-button"
                  onClick={() => handleDeleteItem("ingredients", ingredient)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <input
            autoComplete="off"
            type="text"
            name="ingredients"
            value={currentInputs.ingredients}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add Ingredients"
          />
        </div>

        {/* Excluded Ingredients Input */}
        <div className="filter-group">
          <ul className="selected-items">
            {localFilters.excluded.map((excluded) => (
              <li key={excluded} className={`selected-item excluded`}>
                {excluded}
                <button
                  className="remove-button"
                  onClick={() => handleDeleteItem("excluded", excluded)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <input
            autoComplete="off"
            type="text"
            name="excluded"
            value={currentInputs.excluded}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Excluded Ingredients"
          />
        </div>

        {/* Dynamic Filters */}
        {Object.keys(filterOptions).map((key) => {
          const filterKey = key.replace("filter-", "") as keyof LocalFilters; // Cast filterKey to keyof LocalFilters

          return (
            <div key={key} className="filter-group">
              {/* Selected items for the filter */}

              <label
                onClick={(e) => {
                  e.stopPropagation(); // Prevent handleClickOutside from firing
                  toggleDropdown(filterKey); // Open/close the clicked dropdown
                }}
                className="dropdown-label"
              >
                {Array.isArray(localFilters[filterKey]) &&
                localFilters[filterKey].length > 0 ? (
                  // Show selected filters if available
                  <div className="selected-filters">
                    {(localFilters[filterKey] as string[]).map(
                      (item, index, array) => (
                        <span key={item} className="selected-sfilter">
                          {item}
                          {index < array.length - 1 && " & "}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  // Default label text if no filters are selected
                  filterKey.charAt(0).toUpperCase() + filterKey.slice(1)
                )}
                <span className="dropicon">
                  {openDropdown === filterKey ? "❌" : "🥕"}
                </span>
              </label>

              {openDropdown === filterKey && (
                <div className="filterbox">
                  <div className="dropdown-content">
                    {(
                      filterOptions[
                        key as keyof typeof filterOptions
                      ] as string[]
                    ).map((option) => (
                      <div key={option} className="checkbox-option">
                        <input
                          id={`${filterKey}-${option}`}
                          type="checkbox"
                          name={filterKey}
                          value={option}
                          checked={
                            Array.isArray(localFilters[filterKey]) &&
                            (localFilters[filterKey] as string[]).includes(
                              option
                            )
                          }
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`${filterKey}-${option}`}>
                          {option}
                          <span>✓</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit Button */}
        <button className="submit-button" onClick={handleSubmit}>
          Nom Nom
        </button>
        <button className="clear-button" onClick={handleCancle}>
          Cancle
        </button>
      </div>
    </div>
  );
};

export default Filter;
