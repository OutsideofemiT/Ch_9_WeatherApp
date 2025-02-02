import dotenv from 'dotenv';
dotenv.config();
// Import necessary modules
import fetch from 'node-fetch';
class Weather {
    constructor(temperature, description) {
        this.temperature = temperature;
        this.description = description;
    }
}
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5/';
        this.apiKey = process.env.API_KEY;
    }
    async fetchLocationData(query) {
        const url = `${this.baseURL}geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('Location not found');
        }
        return data[0];
    }
    destructureLocationData(locationData) {
        return {
            latitude: locationData.lat,
            longitude: locationData.lon,
        };
    }
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
    }
    async fetchWeatherData(coordinates) {
        const url = this.buildWeatherQuery(coordinates);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    parseCurrentWeather(response) {
        const temperature = response.main.temp;
        const description = response.weather[0].description;
        return new Weather(temperature, description);
    }
    async getWeatherForCity(city) {
        const locationData = await this.fetchLocationData(city);
        const coordinates = this.destructureLocationData(locationData);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        return [currentWeather];
    }
}
const weatherService = new WeatherService();
export default weatherService;
