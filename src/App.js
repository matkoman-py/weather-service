import { Grid } from "@mui/material";
import React from "react";
import "./App.css";

const App = () => {
  return (
    <Grid container>
      <Grid item xs={1} md={3} lg={3} />
      <Grid
        container
        item
        xs={10}
        md={6}
        lg={6}
        justifyContent="center"
        alignItems="center"
        className="grid"
      >
        <h1>MA EVO BRE KURCAAA BREE</h1>
      </Grid>
      <Grid item xs={1} md={3} lg={3} />
    </Grid>
  );
};

export default App;
