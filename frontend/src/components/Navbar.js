import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
        <li><Link to="/search">Buscar</Link></li>
        <li><Link to="/offer">Ofertar</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
