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
        item
        justifyContent="center"
        alignItems="center"
        className="parentGrid"
      >
        <Grid item>
          <WbSunnyIcon fontSize="large" />
        </Grid>
        <Grid item className="middleItem">
          <CountrySelect />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Plese enter your location..."
            variant="outlined"
            value={city}
            onChange={() => setCity("Belgrade")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={props.handler}>
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
