import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

const router = Router();

router.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const weather = await weatherService.getWeatherForCity(city);
    await HistoryService.saveCity(city);
    res.json(weather);
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getSearchHistory();
    res.json(history);
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await HistoryService.deleteCity(id);
    res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;

