import * as fs from 'fs/promises';
class HistoryService {
    async read() {
        try {
            const data = await fs.readFile('searchHistory.json', 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading search history:', error);
            return [];
        }
    }
    async write(cities) {
        try {
            const data = JSON.stringify(cities, null, 2);
            await fs.writeFile('searchHistory.json', data, 'utf-8');
        }
        catch (error) {
            console.error('Error writing search history:', error);
        }
    }
    async saveCity(cityName) {
        const cities = await this.read();
        const newCity = { id: Date.now().toString(), name: cityName };
        cities.push(newCity);
        await this.write(cities);
    }
    async getSearchHistory() {
        return await this.read();
    }
    async deleteCity(id) {
        const cities = await this.read();
        const updatedCities = cities.filter(city => city.id !== id);
        await this.write(updatedCities);
    }
    async addCity(city) {
        const cities = await this.read();
        const newCity = { id: Date.now().toString(), name: city };
        cities.push(newCity);
        await this.write(cities);
    }
    async removeCity(id) {
        const cities = await this.read();
        const updatedCities = cities.filter(city => city.id !== id);
        await this.write(updatedCities);
    }
}
export default new HistoryService();
