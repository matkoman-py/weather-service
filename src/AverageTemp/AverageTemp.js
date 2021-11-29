import React from "react";
import "./AverageTemp.css";
const AverageTemp = (props) => {
  return (
    <span className="temp">
      {props.average}
      <sup className="degree">&deg;C</sup>
    </span>
  );
};

export default AverageTemp;
