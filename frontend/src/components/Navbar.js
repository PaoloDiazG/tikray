import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation(); // Obtiene la ruta actual

  // Función para determinar si una ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#143548] text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo de la aplicación */}
        <Link to="/" className="text-2xl font-bold text-[#f29102]">
          Tikray
        </Link>

        {/* Enlaces de navegación */}
        <div className="space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md font-semibold ${
              isActive('/') ? 'bg-[#f29102] text-white' : 'hover:text-[#f29102]'
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/search"
            className={`px-3 py-2 rounded-md font-semibold ${
              isActive('/search') ? 'bg-[#f29102] text-white' : 'hover:text-[#f29102]'
            }`}
          >
            Buscar
          </Link>
          <Link
            to="/offer"
            className={`px-3 py-2 rounded-md font-semibold ${
              isActive('/offer') ? 'bg-[#f29102] text-white' : 'hover:text-[#f29102]'
            }`}
          >
            Ofertar
          </Link>
          <Link
            to="/profile"
            className={`px-3 py-2 rounded-md font-semibold ${
              isActive('/profile') ? 'bg-[#f29102] text-white' : 'hover:text-[#f29102]'
            }`}
          >
            Mi Perfil
          </Link>
          <Link
            to="/chats"
            className={`px-3 py-2 rounded-md font-semibold ${
              isActive('/chats') ? 'bg-[#f29102] text-white' : 'hover:text-[#f29102]'
            }`}
          >
            Mis Chats
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-[#f29102] text-white rounded-md font-semibold"
          >
            INGRESA
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



