import React, { useState } from 'react';

function LoginRegisterPage() {
  const [isRegister, setIsRegister] = useState(true); // Alterna entre registro e inicio de sesión
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
  });

  // Función para manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();
    alert('¡Registro exitoso!');
  };

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    alert('¡Inicio de sesión exitoso!');
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col items-center p-6">
      {/* Botones para alternar entre registro e inicio de sesión */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsRegister(true)}
          className={`px-4 py-2 ${isRegister ? 'bg-[#f29102]' : 'bg-gray-300'} text-white rounded-md font-semibold transition`}
        >
          Registrarte
        </button>
        <button
          onClick={() => setIsRegister(false)}
          className={`px-4 py-2 ${!isRegister ? 'bg-[#f29102]' : 'bg-gray-300'} text-white rounded-md font-semibold transition`}
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Formulario de registro */}
      {isRegister ? (
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-[#143548] mb-4 text-center">INGRESA TUS DATOS</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          >
            <option value="">Selecciona tu sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#143548] text-white rounded-md font-semibold hover:bg-[#f29102] transition"
          >
            Registrarte
          </button>
        </form>
      ) : (
        // Formulario de inicio de sesión
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-[#143548] mb-4 text-center">BIENVENIDO DE VUELTA</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#143548] text-white rounded-md font-semibold hover:bg-[#f29102] transition"
          >
            Iniciar Sesión
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginRegisterPage;
