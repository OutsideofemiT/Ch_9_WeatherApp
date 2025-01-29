import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

 const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
const { city } = req.body;
try {
// TODO: GET weather data from city name
const weatherData = await WeatherService.getWeatherData(city);
  
  // TODO: save city to search history
  await HistoryService.saveCity(city);
  
  //Return weather data to the client
  res.status(200).json(weatherData);
} catch (error) {
  res.status(500).json({error: 'Failed to retrieve weather data'});
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getSearchHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params

  try {
    await HistoryService.deleteCity(id);
    res.status(200).json({ message: 'City deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history'});

  }
});

export default router;
