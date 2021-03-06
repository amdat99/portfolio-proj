import React, { useState, useEffect } from "react";

import "./Weather-box.scss";

function WeatherBox(props) {
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [weatherToggle, setWeatherToggle] = useState(false);
  const [geoLocation, setGeolocation] = useState(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    getLocation();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (geoLocation) {
      fetchGeoData(geoLocation.longitude, geoLocation.latitude);
    }
  }, [geoLocation]);

  useEffect(() => {
    if (geoData) {
      geoData.data.map((data) => {
        return setLocation(data.locality);
      });

      toggleWeather();
    }
    //eslint-disable-next-line
  }, [geoData]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const onSendLocation = async () => {
    await setLocationData(null);
    await fetch("https://aamirproject-api.herokuapp.com/weathering", {
      // fetch('http://localhost:4000/weathering',{
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setLocationKey(data.Key)
        fetchWeatherData(data.Key);
      });
  };

  const fetchWeatherData = async (key) => {
    if (key === undefined) {
      return onSendLocation();
    }

    await fetch("https://aamirproject-api.herokuapp.com/weatherdata", {
      // fetch('http://localhost:4000/weatherdata',{
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locationKey: key,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLocation("");
        setLocationData(data);
      });
  };

  const fetchGeoData = async (longitude, latitude) => {
    await fetch("https://aamirproject-api.herokuapp.com/geodata", {
      // fetch('http://localhost:4000/geodata',{
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longitude: longitude,
        latitude: latitude,
      }),
    })
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  };

  const onChange = (event) => {
    setLocation(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSendLocation();
  };

  const toggleWeather = () => {
    setWeatherToggle(!weatherToggle);
  };
  const success = (position) => {
    setGeolocation(position.coords);
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //eslint-disable-next-line
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("geo location not supported");
    }
  }

  return (
    <div>
      <h4 id="weather-title" onClick={toggleWeather}>
        ⛅current weather
      </h4>

      {weatherToggle ? (
        <div className="weather-container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="type location"
              onChange={onChange}
              value={location}
              id="weather-input"
            />
            <button id="weather-button" type="submit">
              Send
            </button>
          </form>
          {locationData ? (
            <div>
              <div className="weather Data">
                <div>{locationData.WeatherText}</div>
                <span>{locationData.Temperature.Metric.Value} °C</span>
              </div>
              {/* )} */}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default WeatherBox;
