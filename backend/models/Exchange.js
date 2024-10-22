const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Object = require('./Object');

const Exchange = sequelize.define('Exchange', {
  status: {
    type: DataTypes.ENUM('Pendiente', 'Completado', 'Cancelado'), // Estado del intercambio
    defaultValue: 'Pendiente',
  }
}, {
  tableName: 'exchanges',
  timestamps: true, // Incluye 'createdAt' y 'updatedAt'
});

// Relación: Un intercambio tiene un objeto, un emisor y un receptor
Exchange.belongsTo(Object, { foreignKey: 'objectId', as: 'object' });
Exchange.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Exchange.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

Object.hasMany(Exchange, { foreignKey: 'objectId', as: 'exchanges' });
User.hasMany(Exchange, { foreignKey: 'senderId', as: 'sentExchanges' });
User.hasMany(Exchange, { foreignKey: 'receiverId', as: 'receivedExchanges' });

module.exports = Exchange;
