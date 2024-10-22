const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Relación con el modelo de Usuario

const Object = sequelize.define('Object', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false, // Se espera que el frontend suba la imagen a Cloudinary y almacene la URL
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'objects',
  timestamps: true, // Incluye 'createdAt' y 'updatedAt'
});

// Relación: Un usuario puede tener muchos objetos
User.hasMany(Object, { foreignKey: 'userId', as: 'objects' });
Object.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Object;
