import * as fs from 'fs/promises';

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile('searchHistory.json', 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile('searchHistory.json', data, 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  async saveCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const newCity = { id: Date.now().toString(), name: cityName };
    cities.push(newCity);
    await this.write(cities);
  }

  async getSearchHistory(): Promise<City[]> {
    return await this.read();
  }

  async deleteCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }

  async addCity(city: string): Promise<void> {
    const cities = await this.read();
    const newCity = { id: Date.now().toString(), name: city };
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
