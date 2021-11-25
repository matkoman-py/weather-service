import { Grid } from "@mui/material";
import React from "react";

const NextDays = (props) => {
  const dayArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div>
      <Grid>
        {props.days.map((day) => {
          const day_avg = day.avg_temp;
          const date = dayArray[new Date(day.date).getDay()];
          return (
            <Grid>
              {day_avg} +++ {date}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default NextDays;
