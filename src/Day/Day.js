import React from "react";
import "./Day.css";

const Day = (props) => {
  return (
    <div className="wrapper">
      <span className="text">{props.date.toUpperCase()}</span>
      <div className="temperature">
        <span>
          {props.day_avg}
          <sup className="celsius">&deg;C</sup>
        </span>
      </div>
    </div>
  );
};

export default Day;
