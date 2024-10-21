const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Cambia según tu configuración
    methods: ["GET", "POST"]
  }
});

// Manejar la conexión de los sockets
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Unirse a una sala específica
  socket.on('join', (room) => {
    socket.join(room);
  });

  // Escuchar y reenviar mensajes
  socket.on('message', ({ userToChat, message }) => {
    io.to(userToChat).emit('message', { sender: 'Otro Usuario', text: message });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Servidor de Socket.io corriendo en el puerto 3002');
});
