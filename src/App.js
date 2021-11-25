import { Grid } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import AverageTemp from "./AverageTemp/AverageTemp";
import CustomInput from "./CustomInput/CustomInput";
import { WeatherInfo } from "./data";
import NextDays from "./NextDays/NextDays";

const App = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [days, setDays] = useState([]);
  const [avgTemp, setAvgTemp] = useState(0);

  const searchClicked = () => {
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
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="app"
      style={{
        backgroundImage: isDataLoaded
          ? "linear-gradient(150deg, #FFFFCC, #CCFFFF)"
          : "linear-gradient(150deg, #CCFFFF, #FFFFCC)",
      }}
    >
      <Grid item xs={1} sm={1} md={2} lg={3} />
      <Grid
        container
        item
        xs={10}
        sm={10}
        md={8}
        lg={6}
        justifyContent="center"
        alignItems="center"
        className="grid"
        direction="column"
      >
        <CustomInput handler={searchClicked} />
        {isDataLoaded && <AverageTemp average={avgTemp} />}
        {isDataLoaded && <NextDays days={days.slice(0, -3)} />}
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={3} />
    </Grid>
  );
};

export default App;
