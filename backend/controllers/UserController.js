const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('objects');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el perfil', error });
  }
};