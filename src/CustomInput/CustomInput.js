import { Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CountrySelect from "./CountrySelect/CountrySelect";
import { TextField, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "./CustomInput.css";
import { useState } from "react";

const CustomInput = (props) => {
  const [city, setCity] = useState("Belgrade");

  return (
    <div className="parentDiv">
      <Grid
        direction="row"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container xs={4} sm={1} md={1} lg={1} justifyContent="end">
          <WbSunnyIcon fontSize="large" />
        </Grid>
        <Grid item xs={8} sm={4} md={4} lg={4} className="middleItem">
          <CountrySelect />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          lg={7}
          container
          justifyContent="center"
        >
          <TextField
            placeholder="Plese enter your location..."
            variant="outlined"
            value={city}
            onChange={() => setCity("Belgrade")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => props.handler(city)}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomInput;
