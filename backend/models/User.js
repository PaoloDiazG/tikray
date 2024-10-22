const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
    allowNull: false,
  },
  identityDocument: {
    type: DataTypes.STRING(8), // Campo para DNI o CE
    allowNull: false,
    unique: true,
    validate: {
      len: [8, 8], // Validar longitud de 8 dígitos
      isNumeric: true, // Validar que solo contenga números
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;

