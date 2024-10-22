const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const { email, password, name, birthDate, gender, identityDocument } = req.body;

    // Validar el documento de identidad
    if (!/^\d{8}$/.test(identityDocument)) {
      return res.status(400).json({ message: 'El documento de identidad debe tener exactamente 8 dígitos.' });
    }

    // Verificar si el documento de identidad ya está registrado
    const existingUser = await User.findOne({ where: { identityDocument } });
    if (existingUser) {
      return res.status(400).json({ message: 'El documento de identidad ya está registrado.' });
    }

    // Verificar si el correo ya está registrado
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({ email, password: hashedPassword, name, birthDate, gender, identityDocument });
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario.', error });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios.', error });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario.', error });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { name, birthDate, gender } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Actualizar solo nombre, fecha de nacimiento y género
    await user.update({ name, birthDate, gender });
    res.json({ message: 'Usuario actualizado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario.', error });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    await user.destroy();
    res.json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.', error });
  }
});

module.exports = router;

