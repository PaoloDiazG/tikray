const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para usar las variables de entorno

// Crear una nueva instancia de Sequelize con los datos de conexión
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Host de la base de datos
    port: process.env.DB_PORT, // Puerto de la base de datos (5432 por defecto)
    dialect: 'postgres', // Especificar el dialecto de la base de datos (PostgreSQL)
    logging: false, // Desactiva el registro de consultas en la consola
  }
);

// Verificar la conexión a la base de datos
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Termina la aplicación si no se conecta a la base de datos
  }
}

module.exports = { sequelize, connectDB };
