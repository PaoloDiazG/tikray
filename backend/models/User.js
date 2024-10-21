const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: false, // Ahora es opcional para usuarios autenticados con Google
  },
  googleId: {
    type: String,
    unique: true, // ID de Google para usuarios autenticados con Google OAuth
  },
  objects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
