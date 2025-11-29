import React from "react";
import Select from "react-select";

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#0f172a",
    borderColor: "#1f2937",
    color: "#fff",
    minHeight: 32, // slightly smaller height
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: 12, // smaller font
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#0f172a",
    color: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#1e293b" : "#0f172a", // hover background
    color: "#fff",
    cursor: "pointer",
    fontSize: 12, // smaller font
    padding: "8px 10px", // reduce padding to match smaller font
    transition: "all 0.2s ease",
  }),
};

export default function LanguageSelector({ options, selectedOption, setSelectedOption }) {
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      styles={selectStyles}
      isSearchable
    />
  );
}
