const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config(); // Cargar variables de entorno
require('./passportConfig'); // Configuración de Google OAuth
const objectRoutes = require('./routes/objectRoutes');
const userRoutes = require('./routes/userRoutes');

// Inicializar la aplicación Express
const app = express();

// Configurar middleware de sesión
app.use(
  session({
    secret: process.env.JWT_SECRET, // Usa un secreto seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambiar a true en producción con HTTPS
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar middlewares para cuerpos de peticiones
app.use(express.json());


app.use('/api/objects', objectRoutes);
app.use('/api/users', userRoutes);
// Configurar middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡El backend de Tikray está funcionando!');
});

// Ruta para iniciar sesión con Google
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback de Google
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirige a la página de inicio una vez autenticado
    res.redirect('/');
  }
);
// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
