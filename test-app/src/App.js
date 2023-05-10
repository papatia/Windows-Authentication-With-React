import React from "react";

import "./App.css";

import { WeatherForecestService } from "./_services/weather-forecest-service";



function App() {
  
  const getWeatherForecest = () => {
    WeatherForecestService.getWeatherForecest()
      .then((response) => {
        console.log(JSON.stringify(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">       
        <div className="button-panel">      
          <button type="button" onClick={getWeatherForecest}>
            Get roles
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
