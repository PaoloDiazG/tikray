const express = require('express');
const router = express.Router();
const Object = require('../models/Object');

// Crear un objeto
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl, description, category, city, userId } = req.body;
    const object = await Object.create({ name, imageUrl, description, category, city, userId });
    res.status(201).json({ message: 'Objeto creado exitosamente.', object });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el objeto.', error });
  }
});

// Obtener todos los objetos
router.get('/', async (req, res) => {
  try {
    const objects = await Object.findAll();
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener objetos.', error });
  }
});

// Obtener un objeto por ID
router.get('/:id', async (req, res) => {
  try {
    const object = await Object.findByPk(req.params.id);
    if (!object) {
      return res.status(404).json({ message: 'Objeto no encontrado.' });
    }
    res.json(object);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el objeto.', error });
  }
});

// Actualizar un objeto
router.put('/:id', async (req, res) => {
  try {
    const { name, imageUrl, description, category, city } = req.body;
    const object = await Object.findByPk(req.params.id);
    if (!object) {
      return res.status(404).json({ message: 'Objeto no encontrado.' });
    }
    await object.update({ name, imageUrl, description, category, city });
    res.json({ message: 'Objeto actualizado exitosamente.', object });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el objeto.', error });
  }
});

// Eliminar un objeto
router.delete('/:id', async (req, res) => {
  try {
    const object = await Object.findByPk(req.params.id);
    if (!object) {
      return res.status(404).json({ message: 'Objeto no encontrado.' });
    }
    await object.destroy();
    res.json({ message: 'Objeto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el objeto.', error });
  }
});

module.exports = router;
