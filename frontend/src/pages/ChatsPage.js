import React, { useState } from 'react';

// Datos simulados para los chats
const chatList = [
  { id: 1, name: 'Paolo (tú)', lastMessage: '😊', time: 'Ayer', isActive: true },
  { id: 2, name: 'Andrea Maxi UCSM', lastMessage: '🔒 y uso nomás cifrado de contraseñas', time: '17:27', isActive: false },
  { id: 3, name: 'Ing. Sistemas - VI semestre', lastMessage: 'Buenas tardes chicos...', time: '16:55', isActive: false },
  // Otros chats simulados...
];

function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(chatList[0]); // Estado para el chat seleccionado

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Lista de chats */}
      <div className="w-1/3 bg-[#143548] text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <input
          type="text"
          placeholder="Busca un chat o inicia uno nuevo..."
          className="w-full p-2 mb-4 bg-[#1f4d68] text-white placeholder-gray-300 rounded-md focus:outline-none"
        />
        <div className="space-y-2">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 flex items-center justify-between rounded-md cursor-pointer ${
                chat.isActive ? 'bg-[#f29102]' : 'hover:bg-[#1f4d68]'
              }`}
            >
              <div>
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-300">{chat.lastMessage}</p>
              </div>
              <span className="text-sm text-gray-300">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="w-2/3 bg-white flex flex-col">
        <div className="bg-[#f29102] p-4 flex items-center">
          <h2 className="text-xl font-bold text-white">{selectedChat.name}</h2>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Mensajes simulados */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
                <p className="text-sm">Hola, ¿cómo estás?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#f29102] text-white p-3 rounded-lg max-w-xs">
                <p className="text-sm">Todo bien, gracias. ¿Y tú?</p>
              </div>
            </div>
          </div>
        </div>
        {/* Campo de entrada de mensaje */}
        <div className="p-4 bg-gray-100 flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
          />
          <button className="ml-2 px-4 py-2 bg-[#f29102] text-white rounded-md font-semibold hover:bg-[#d57c01] transition">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatsPage;
