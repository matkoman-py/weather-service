import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import AverageTemp from "./AverageTemp/AverageTemp";
import Current from "./Current/Current";
import CustomInput from "./CustomInput/CustomInput";
import { WeatherInfo } from "./data";
import Dates from "./Dates/Dates";
import Day from "./Day/Day";

const App = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [days, setDays] = useState([]);
  const [avgTemp, setAvgTemp] = useState(0);
  const [currentTemp, setCurrentTemp] = useState("");
  const [hoursMinutes, setHoursMinutes] = useState("");
  const [city, setCity] = useState("");

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

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const searchClicked = async (city) => {
    const current = await fetchCurrent();
    const currentTempKelvin = current.main.temp;
    const currentTempCelsius = currentTempKelvin - 273.15;
    const currentDateTime = new Date(current.dt * 1000);
    const h = addZero(currentDateTime.getHours());
    const m = addZero(currentDateTime.getMinutes());

    setHoursMinutes(h + ":" + m);
    setCurrentTemp(currentTempCelsius.toFixed(2));
    setCity(city);

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
          : "linear-gradient(to right bottom, #e5f1ff, #e0f7fe, #e2fbf9, #ecfef2, #fbffed)",
      }}
    >
      <CustomInput handler={searchClicked} />
      {isDataLoaded && (
        <Current
          city={city}
          hoursMinutes={hoursMinutes}
          currentTemp={currentTemp}
        />
      )}
      {isDataLoaded && <Dates firstDay={days[0]} lastDay={days[6]} />}
      {isDataLoaded && <AverageTemp average={avgTemp} />}
      {isDataLoaded && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "40px" }}
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
