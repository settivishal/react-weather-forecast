import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import CorrectData from "./CorrectData";

const Display = (props) => {
  const [weatherLocation, setWeatherLocation] = useState("");
  const [weatherCurrent, setWeatherCurrent] = useState("");
  const [weatherCurrentCond, setWeatherCurrentCond] = useState("");
  const [isNull, setIsNull] = useState(false);

  const getWeatherData = async (searchName) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=caab7ff0f39141e6a8731620212206&q=${searchName}&aqi=no`
    )
      .then((res) => {
        if (res.ok) {
          setIsNull(false);
          return res.json();
        }
        setIsNull(true);
        swal("Error!", "Enter valid City Name", "error");
        throw new Error(res.status);
      })
      .then((data) => {
        setWeatherLocation(data.location);
        setWeatherCurrent(data.current);
        setWeatherCurrentCond(data.current.condition);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWeatherData(props.searchName);
  }, [props.searchName]);

  return (
    <section className="display">
      {!isNull ? (
        <CorrectData
          name={weatherLocation.name}
          region={weatherLocation.region}
          time={weatherLocation.localtime}
          temp={weatherCurrent.temp_c}
          condition={weatherCurrentCond.text}
          icon={weatherCurrentCond.icon}
        />
      ) : (
        <h1 className="no_data">No Data Found!</h1>
      )}
    </section>
  );
};

export default Display;
