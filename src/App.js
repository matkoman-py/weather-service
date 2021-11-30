import { CircularProgress, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import AverageTemp from "./AverageTemp/AverageTemp";
import Current from "./Current/Current";
import CustomInput from "./CustomInput/CustomInput";
import { WeatherInfo } from "./data";
import Dates from "./Dates/Dates";
import Day from "./Day/Day";

const App = () => {
  // osnovni stejtovi koji su potrebni u aplikaciji:
  // stejt koji se koristi da signalizira da su podaci ucitani
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // stejt pomocu kojeg simuliram ucitavanje
  const [loadingData, setLoadingData] = useState(false);
  // niz u koji ucitavam podatke o 10 dana
  const [days, setDays] = useState([]);
  // prosecna temperatura u sledecih 10 dana
  const [avgTemp, setAvgTemp] = useState(0);
  // najskorije izmerena temperatura
  const [currentTemp, setCurrentTemp] = useState("");
  // vreme merenja temperature
  const [hoursMinutes, setHoursMinutes] = useState("");
  // grad za koji ucitavamo podatke
  const [city, setCity] = useState("");
  // boje za gradijent
  const [firstColor, setFirstColor] = useState("");
  const [secondColor, setSecondColor] = useState("");

  // niz koji mi treba za dobijanje imena dana pomocu datuma preko getDay() metode
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // asinhrona funkcija koja poziva api da nabavi najskorije izmerenu temperaturu i vreme merenja
  // vraca ovo u obliku normalnog js objekta
  const fetchCurrent = async () => {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Belgrade&appid=bb9fdd0eaa5ef1f813ec710f6e065bac"
    );
    const data = await response.json();
    return data;
  };

  // pomocna metoda za formatiranje sati i minuta da ne bi imali slucaj npr. 9:9, vec 09:09
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  // -40 #07219D
  // -30 395AF6
  // -20 3992F6
  // -10 39B1F6
  // 0 A1D7EF
  // 10 A1EFE6
  // 20 F7CF42
  // 30 F6CF7E
  // 40 F6A749
  // podesavanje boja
  const selectColors = (temp) => {
    if (temp < -30) {
      setFirstColor("#07219D");
      setSecondColor("#395AF6");
    } else if (temp >= -30 && temp < -20) {
      setFirstColor("#395AF6");
      setSecondColor("#3992F6");
    } else if (temp >= -20 && temp < -10) {
      setFirstColor("#3992F6");
      setSecondColor("#39B1F6");
    } else if (temp >= -10 && temp < 0) {
      setFirstColor("#39B1F6");
      setSecondColor("#A1D7EF");
    } else if (temp >= 0 && temp < 10) {
      setFirstColor("#A1D7EF");
      setSecondColor("#A1EFE6");
    } else if (temp >= 10 && temp < 20) {
      setFirstColor("#A1EFE6");
      setSecondColor("#F7CF42");
    } else if (temp >= 20 && temp < 30) {
      setFirstColor("#F7CF42");
      setSecondColor("#F6CF7E");
    } else {
      setFirstColor("#F6CF7E");
      setSecondColor("#F6A749");
    }
  };
  // hendler metoda koju prosledjujem inputu i trigeruje se na klik search buttona
  // u sustini sva logika se nalazi u ovoj funkciji
  const searchClicked = async (city) => {
    // postavljanje stejta za loading na true - krenuce da se prikazuje na stranici
    setLoadingData(true);

    /* nabavljanje najskorijih informacija za hard code-ovan Beograd u mom slucaju, ali lagano izmenljivo prosledjivanjem city-ja
       fetchCurrent metodi */
    const current = await fetchCurrent();
    const currentTempKelvin = current.main.temp;
    const currentTempCelsius = currentTempKelvin - 273.15;
    const currentDateTime = new Date(current.dt * 1000);
    const h = addZero(currentDateTime.getHours());
    const m = addZero(currentDateTime.getMinutes());

    // postavljanje stejtova vezanih za najskorije informacije
    setHoursMinutes(h + ":" + m);
    setCurrentTemp(currentTempCelsius.toFixed(1));
    setCity(city);

    // ucitavanje liste dana, obrada podataka i zatim postavljanje stejtova
    const info = WeatherInfo;
    const sum = info.reduce((prev, curr) => {
      prev += curr.avg_temp;
      return prev;
    }, 0);
    const average = sum / info.length;
    setAvgTemp(average.toFixed(1));
    setDays(info);
    selectColors(average);
    // timeout funkcija kojom simuliram da ucitavanje traje jednu sekundu
    setTimeout(() => {
      setIsDataLoaded(true);
      setLoadingData(false);
    }, 1000);
  };

  return (
    /*odlucio sam se da sve komponente trpam u jedan veliki stack zbog nacina rasporedjivanja komponenti (kao kolona jedna je sve)
    sto se komponenti tice, vecinu uzimam iz MaterialUI, jer mi je on nekako najlaksi za rad i najlepse su komponente,
    one su dosta bazicne, renderuju se u zavisnosti od isDataLoaded stejta, jedina komponenta gde ima nekog
    izracunavanja je Dates, u njoj racunam da li su prvi dan i poslednji dan u istom mesecu, ako nisu bice malo drugaciji prikaz
    nego inace
    iskoristio sam Grid da modelujem sledecih 7 dana*/
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className="app"
      // kada je data ucitana menjamo pozadinu aplikacije
      style={{
        backgroundImage: isDataLoaded
          ? `linear-gradient(150deg, ${firstColor}, ${secondColor})`
          : "linear-gradient(to right bottom, #e5f1ff, #e0f7fe, #e2fbf9, #ecfef2, #fbffed)",
      }}
    >
      <CustomInput handler={searchClicked} />
      {loadingData && <CircularProgress />}
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
