import React from "react";
import "./AverageTemp.css";
const AverageTemp = (props) => {
  return <div className="temp">{props.average}&deg;</div>;
};

export default AverageTemp;
