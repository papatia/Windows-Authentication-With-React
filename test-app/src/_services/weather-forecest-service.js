import { handleResponse, requestBase } from "../_helpers";

const apiBase = "https://localhost:7091/WeatherForecast";

class WeatherForecestService {
  getWeatherForecest() {
    let request = Object.assign({}, requestBase, {mode:"no-cors",method: "GET" });
    let url = `${apiBase}`;

    return fetch(url, request).then(handleResponse);
  }
}

const instance = Object.freeze(new WeatherForecestService());
export { instance as WeatherForecestService };
