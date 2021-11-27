import React from "react";

const Current = (props) => {
  return (
    <h3 className="text">
      Latest: {props.city}, {props.hoursMinutes}, {props.currentTemp}&deg;
    </h3>
  );
};

export default Current;
