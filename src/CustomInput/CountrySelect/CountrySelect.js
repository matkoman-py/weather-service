import { Select } from "@mui/material";
import React from "react";
import "./CountrySelect.css";
const CountrySelect = () => {
  const renderCustomItem = (item) => {
    return (
      <div className="md-country-picker-item">
        <img
          className="md-country-picker-flag"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Serbia_%282004%E2%80%932010%29.svg/1200px-Flag_of_Serbia_%282004%E2%80%932010%29.svg.png"
          }
          alt="Flag"
        />
        {item.name}
      </div>
    );
  };

  return (
    <Select
      defaultValue=""
      value={{
        name: "SER",
        value: "Serbia",
      }}
      style={{ height: "56px" }}
      renderValue={(value) => renderCustomItem(value)}
    />
  );
};

export default CountrySelect;
