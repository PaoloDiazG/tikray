import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Cambia la URL según la configuración de tu backend

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  // Obtener el ID del usuario al que se le va a enviar el mensaje desde la URL
  const userToChat = new URLSearchParams(location.search).get('user');

  useEffect(() => {
    // Unirse a una sala específica del usuario
    socket.emit('join', userToChat);

    // Escuchar los mensajes entrantes
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect(); // Desconectar el socket al salir del componente
    };
  }, [userToChat]);

  // Función para enviar mensajes
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', {userToChat, message });
      setMessages((prevMessages) => [...prevMessages, { sender: 'Yo', text: message }]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat con el Usuario</h1>
      <div style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Enviar
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    height: '300px',
    overflowY: 'scroll',
  },
  message: {
    marginBottom: '5px',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    marginRight: '5px',
  },
  sendButton: {
    padding: '10px',
  },
};

export default ChatPage;
