const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rutas de usuario
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', UserController.getUserProfile);

module.exports = router;
