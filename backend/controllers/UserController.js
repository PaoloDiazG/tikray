const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Object = require('../models/Object');
const Trade = require('../models/Trade');

//Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //Verificar si existe
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json( {msg: 'El usuario ya existe'});

        //Crear nuevo usuario
        const newUser = new User({name, email, password});
        await newUser.save();

        res.status(201).json({msg: 'Usuario registrado correctamente!'});
    } catch (error) {
        res.status(500).json({msg: 'Error al registrar el usuario. Intente nuevamente', error});
    }
};

//Iniciar Sesión
exports.loginUser = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'Usuario no existe'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Contraseña incorrecta"});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({token,user});
    } catch (error) {
     res.status(500).json({ msg: 'Error al iniciar sesión', error });
  }
};

// Obtener información del perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('objects');

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Obtener los últimos 5 intercambios del usuario
    const recentTrades = await Trade.find({ $or: [{ fromUser: user._id }, { toUser: user._id }] })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('object')
      .populate('fromUser', 'name')
      .populate('toUser', 'name');

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
      objects: user.objects,
      recentTrades,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el perfil del usuario', error });
  }
};

// Actualizar información del perfil del usuario
exports.updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ msg: 'Perfil actualizado correctamente', user });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar el perfil del usuario', error });
  }
};

// Obtener objetos disponibles del usuario
exports.getUserObjects = async (req, res) => {
  try {
    const objects = await Object.find({ owner: req.user.id });

    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener objetos del usuario', error });
  }
};

// Obtener intercambios recientes del usuario
exports.getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ $or: [{ fromUser: req.user.id }, { toUser: req.user.id }] })
      .sort({ createdAt: -1 })
      .populate('object')
      .populate('fromUser', 'name')
      .populate('toUser', 'name');

    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener intercambios recientes del usuario', error });
  }
};