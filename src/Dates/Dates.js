import React, { useEffect, useState } from "react";
import "./Dates.css";
const Dates = (props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [firstMonth, setFirstMonth] = useState("");
  const [secondMonth, setSecondMonth] = useState("");
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const firstDate = new Date(props.firstDay.date);
    const secondDate = new Date(props.lastDay.date);

    setFirstDay(firstDate.getDate());
    setLastDay(secondDate.getDate());
    setYear(firstDate.getFullYear());

    const firstDayMonth = months[firstDate.getMonth()];
    const lastDayMonth = months[secondDate.getMonth()];

    if (firstDayMonth !== lastDayMonth) {
      setSecondMonth(lastDayMonth);
    }
    setFirstMonth(firstDayMonth);
  }, []);

  return (
    <h4 className="text">
      {firstMonth} {firstDay} - {secondMonth} {lastDay} {year}
    </h4>
  );
};

export default Dates;
