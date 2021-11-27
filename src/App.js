import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import AverageTemp from "./AverageTemp/AverageTemp";
import CustomInput from "./CustomInput/CustomInput";
import { WeatherInfo } from "./data";
import Dates from "./Dates/Dates";
import Day from "./Day/Day";

const App = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [days, setDays] = useState([]);
  const [avgTemp, setAvgTemp] = useState(0);
  const dayArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchCurrent = async () => {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Belgrade&appid=bb9fdd0eaa5ef1f813ec710f6e065bac"
    );
    const data = await response.json();
    return data;
  };

  const searchClicked = async () => {
    const current = await fetchCurrent();

    const info = WeatherInfo;
    const sum = info.reduce((prev, curr) => {
      prev += curr.avg_temp;
      return prev;
    }, 0);
    const average = sum / info.length;
    setAvgTemp(average);
    setDays(info);
    setIsDataLoaded(true);
  };

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className="app"
      style={{
        backgroundImage: isDataLoaded
          ? "linear-gradient(150deg, #FFFFCC, #CCFFFF)"
          : "linear-gradient(150deg, #CCFFFF, #FFFFCC)",
      }}
    >
      <CustomInput handler={searchClicked} />
      {isDataLoaded && <Dates firstDay={days[0]} lastDay={days[6]} />}
      {isDataLoaded && <AverageTemp average={avgTemp} />}
      {isDataLoaded && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {days.slice(0, -3).map((day) => {
            const day_avg = day.avg_temp;
            const date = dayArray[new Date(day.date).getDay()];
            return <Day date={date} day_avg={day_avg} key={date} />;
          })}
        </Grid>
      )}
    </Stack>
  );
};

export default App;
