
import * as fs from 'fs/promises';

// TODO: Define a City class with name and id properties
interface City {
  id: string;
  name: string;
}


// TODO: Complete the HistoryService class
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
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
 async removeCity(id: string) {}
}

export default new HistoryService();
