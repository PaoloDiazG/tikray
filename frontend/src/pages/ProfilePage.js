import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

// Datos simulados para intercambios y objetos disponibles
const recentTrades = [
  { id: 1, item: 'Mochila "Porta" Rosada', from: 'Paolo Díaz', to: 'Javier Ochoa' },
  { id: 2, item: 'Escritorio de madera', from: 'Paolo Díaz', to: 'Daniela Chaver' },
];

const availableObjects = [
  { id: 1, name: 'Casaca de Cuero', imageUrl: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Reloj Deportivo', imageUrl: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Camisa a cuadros', imageUrl: 'https://via.placeholder.com/100' },
];

function ProfilePage() {
  // Obtener la información del usuario del estado de Redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Estados locales para los campos editables y el modo de edición
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  // Función para manejar la actualización del usuario
  const handleUpdate = () => {
    dispatch(updateUser({ name, email }));
    alert('Información actualizada!');
    setIsEditing(false); // Cierra el modo de edición
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-6">
      {/* Encabezado del perfil */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-[#143548] mb-4">MI PERFIL</h1>

        {/* Imagen de perfil */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-5xl text-white">👤</span>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#143548]">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          {/* Botón de editar */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 flex items-center justify-center text-[#143548] hover:text-[#f29102] transition"
            >
              ✏️ <span className="ml-2">Editar</span>
            </button>
          )}

          {/* Formulario de edición de perfil */}
          {isEditing && (
            <div className="mt-4 space-y-2">
              <div>
                <label className="block text-sm text-[#143548]">Nombre:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#143548]">Correo Electrónico:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleUpdate}
                  className="w-full py-2 mr-2 bg-[#143548] text-white rounded-md font-semibold hover:bg-[#f29102] transition"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2 ml-2 bg-gray-400 text-white rounded-md font-semibold hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Últimos intercambios */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-[#143548] mb-4 text-center">Últimos intercambios</h3>
        <div className="flex flex-col gap-4">
          {recentTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <span className="text-sm font-medium text-[#143548]">{trade.from}</span>
              <div className="flex items-center mx-2">
                <span className="text-lg text-gray-500">{trade.item}</span>
                <span className="mx-2 text-[#f29102]">→</span>
              </div>
              <span className="text-sm font-medium text-[#143548]">{trade.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Objetos disponibles */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-[#143548] mb-4 text-center">Objetos Disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableObjects.map((obj) => (
            <div
              key={obj.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-[#143548]">{obj.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
