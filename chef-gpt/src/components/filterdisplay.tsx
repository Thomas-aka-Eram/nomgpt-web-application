import React from "react";
import { useState, useEffect } from "react";
import { LocalFilters } from "./types";

interface FilterDisplay {
  filterdata: LocalFilters;
}

const FilterDisplay: React.FC<FilterDisplay> = ({ filterdata }) => {
  return (
    <div className="filterdisplay-container">
      {" "}
      <div className="filtertv">
        <ul>
          {Object.entries(filterdata)
            .filter(([key, value]) => {
              // Exclude empty or default values
              if (Array.isArray(value)) return value.length > 0; // Check arrays
              return value; // Check strings or numbers
            })
            .flatMap(([key, value]) => {
              if (Array.isArray(value)) {
                // If the value is an array, map over each item
                return value.map((item) => (
                  <li key={`${key}-${item}`} className={key}>
                    {item}
                  </li>
                ));
              }
              // Otherwise, render the value directly
              return <li key={key}>{value.toString()}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default FilterDisplay;
