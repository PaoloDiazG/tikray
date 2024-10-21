require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Conectar a la base de datos de MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API de Tikray está funcionando');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
