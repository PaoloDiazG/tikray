const express = require('express');
const router = express.Router();
const ObjectController = require('../controllers/ObjectController');

// Rutas de objeto
router.post('/', ObjectController.createObject);
router.get('/', ObjectController.getObjects);
router.get('/search', ObjectController.searchObjects); // Nueva ruta para búsqueda
router.get('/:id', ObjectController.getObjectById);
router.delete('/:id', ObjectController.deleteObject);

module.exports = router;
