const express = require('express');
const router = express.Router();
const Exchange = require('../models/Exchange');

// Crear un intercambio
router.post('/', async (req, res) => {
  try {
    const { objectId, senderId, receiverId } = req.body;
    const exchange = await Exchange.create({ objectId, senderId, receiverId });
    res.status(201).json({ message: 'Intercambio creado exitosamente.', exchange });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el intercambio.', error });
  }
});

// Obtener todos los intercambios
router.get('/', async (req, res) => {
  try {
    const exchanges = await Exchange.findAll();
    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener intercambios.', error });
  }
});

// Obtener un intercambio por ID
router.get('/:id', async (req, res) => {
  try {
    const exchange = await Exchange.findByPk(req.params.id);
    if (!exchange) {
      return res.status(404).json({ message: 'Intercambio no encontrado.' });
    }
    res.json(exchange);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el intercambio.', error });
  }
});

module.exports = router;

