const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const objectRoutes = require('./routes/objectRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Cors
app.use(cors({
  origin: 'http://localhost:3005', // Ajusta esto al dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB()

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

//Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/objects', objectRoutes);
app.use('/api/exchanges', exchangeRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de Tikray funcionando correctamente!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
