import React from "react";
import "./Day.css";

const Day = (props) => {
  return (
    <div className="wrapper">
      <span className="text">{props.date.toUpperCase()}</span>
      <div className="temperature">{props.day_avg}&deg;</div>
    </div>
  );
};

export default Day;
