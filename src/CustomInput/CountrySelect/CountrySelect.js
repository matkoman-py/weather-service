import { Select } from "@mui/material";
import React from "react";
import "./CountrySelect.css";
const CountrySelect = () => {
  const arrayOptions = [
    {
      id: "SER",
      name: "Serbia",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Serbia_%282004%E2%80%932010%29.svg/1200px-Flag_of_Serbia_%282004%E2%80%932010%29.svg.png",
    },
  ];

  const renderCustomItem = (id) => {
    const item = arrayOptions.find((item) => item.id === id);
    return (
      <div className="country-picker-item">
        <img className="country-picker-flag" src={item.image} alt="Flag" />
        {id}
      </div>
    );
  };

  const handleChange = (e) => {
    alert(e);
  };

  return (
    <Select
      value={"SER"}
      defaultValue={"SER"}
      style={{ height: "56px" }}
      renderValue={(value) => renderCustomItem(value)}
      onChange={handleChange}
    >
      {arrayOptions.map((item) => {
        return (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        );
      })}
    </Select>
  );
};

export default CountrySelect;
