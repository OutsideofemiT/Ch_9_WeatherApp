import dotenv from 'dotenv';
dotenv.config();

// Import necessary modules
import fetch from 'node-fetch';

interface Coordinates {
  latitude: number;
  longitude: number;
}

class Weather {
  temperature: number;
  description: string;

  constructor(temperature: number, description: string) {
    this.temperature = temperature;
    this.description = description;
  }
}

class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.API_KEY!;
  }

  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.baseURL}geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(url);
    const data: any[] = await response.json() as any[];
    if (data.length === 0) {
      throw new Error('Location not found');
    }
    return data[0];
  }

  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    return new Weather(temperature, description);
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return [currentWeather];
  }
}

const weatherService = new WeatherService();
export default weatherService;
