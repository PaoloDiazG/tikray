const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Middleware de autenticación (por ejemplo, para JWT)
const { authMiddleware } = require('../middlewares/authMiddleware');

// Rutas de usuario
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', authMiddleware, UserController.getUserProfile); // Obtener perfil del usuario
router.put('/profile', authMiddleware, UserController.updateUserProfile); // Actualizar perfil del usuario
router.get('/profile/objects', authMiddleware, UserController.getUserObjects); // Obtener objetos del usuario
router.get('/profile/trades', authMiddleware, UserController.getUserTrades); // Obtener intercambios recientes

module.exports = router;
