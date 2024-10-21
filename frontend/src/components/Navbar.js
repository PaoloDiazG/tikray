import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#143548] text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo de la aplicación */}
        <Link to="/" className="text-2xl font-bold text-[#f29102]">
          Tikray
        </Link>

        {/* Enlaces de navegación */}
        <div className="space-x-4">
          <Link to="/" className="hover:text-[#f29102]">
            Inicio
          </Link>
          <Link to="/search" className="hover:text-[#f29102]">
            Buscar
          </Link>
          <Link to="/offer" className="hover:text-[#f29102]">
            Ofertar
          </Link>
          <Link to="/profile" className="hover:text-[#f29102]">
            Mi Perfil
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-[#f29102] text-white rounded-md font-semibold hover:bg-[#d57c01] transition"
          >
            INGRESA
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
