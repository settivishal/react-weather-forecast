import { useState, useEffect, useRef } from "react";
import "./App.css";
import swal from "sweetalert";

function App() {
  const [searchName, setSearchName] = useState("Hyderabad");
  const [weatherLocation, setWeatherLocation] = useState("");
  const [weatherCurrent, setWeatherCurrent] = useState("");
  const [weatherCurrentCond, setWeatherCurrentCond] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isNull, setIsNull] = useState(false);

  const searchInput = useRef();

  const getWeatherData = async (searchName) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=caab7ff0f39141e6a8731620212206&q=${searchName}&aqi=no`
      // "http://api.weatherapi.com/v1/current.json?key=caab7ff0f39141e6a8731620212206&q=Hyderabad"
    )
      .then((res) => {
        if (res.ok) {
          setIsNull(false);
          return res.json();
        } else {
          setIsNull(true);
          swal("Error!", "Enter valid City Name", "error");
        }
      })
      .then((data) => {
        if (data) {
          setWeatherLocation(data.location);
          setWeatherCurrent(data.current);
          setWeatherCurrentCond(data.current.condition);
        }
      });
  };

  useEffect(() => {
    getWeatherData(searchName);
  }, [searchName]);

  const search = () => {
    if (searchInput.current.value.trim().length > 4) {
      setIsValid(true);
      setSearchName(searchInput.current.value);
    } else {
      setIsValid(false);
      swal("Error!", "Enter valid City Name", "error");
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      search();
    }
  });

  return (
    <>
      <h1 className="main_header">Weather condition</h1>
      <section className="input_container">
        <input
          type="text"
          placeholder="City Name,country code...."
          ref={searchInput}
          className={`input ${!isValid && "empty"}`}
        />
        <span className="link">
          <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes">
            Check Your Country Code here
          </a>
        </span>
        <button onClick={search} className="input-btn">
          Search
        </button>
      </section>

      <div className="display">
        {!isNull ? (
          <>
            <section>
              <h1>
                <span className="place">{weatherLocation.name}</span>
                <span className="region">{weatherLocation.region}</span>
              </h1>
              <p>{weatherLocation.localtime}</p>
              <div>
                <p className="temp">{weatherCurrent.temp_c}°</p>
                <p className="condition">{weatherCurrentCond.text}</p>
                <img
                  src={weatherCurrentCond.icon}
                  alt="weather condition icon"
                />
              </div>
            </section>
            <section>
              {/* <button className="refresh">
                Refresh
              </button> */}
            </section>
          </>
        ) : (
          <h1 className="no_data">No Data Found!</h1>
        )}
      </div>
    </>
  );
}

export default App;
