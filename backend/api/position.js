const express = require('express');
const api = express.Router();
const positionService = require('../services/positionService.js');
const { validatePosition, validateIDPosition } = require('../middleware/positionMiddleware.js');

api.get('/api/positions', async (req, res) => {
  try {
    const positions = await positionService.getAllPositions();
    res.status(200).json(positions);
  } catch (error) {
    console.error('Error in getAllPositionsController:', error);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

api.post('/api/positions', validatePosition, async (req, res) => {
  const newPositionData = req.body.position;
  try {
    const newPosition = await positionService.addPosition(newPositionData);
    res.json(newPosition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

api.put('/api/positions/:id?', [validateIDPosition, validatePosition], async (req, res) => {
  const positionId = req.params.id;
  const updatedPositionData = req.body.position;
  try {
    const updatedPosition = await positionService.updatePosition(positionId, updatedPositionData);
    res.json(updatedPosition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

api.delete('/api/positions/:id?', validateIDPosition, async (req, res) => {
  const positionId = req.params.id;
  try {
    const result = await positionService.deletePosition(positionId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

module.exports = api;
