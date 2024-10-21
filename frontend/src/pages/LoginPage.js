import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Aquí se manejaría el inicio de sesión con backend (cuando esté implementado)
    alert(`Iniciando sesión con: ${email}`);
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleSuccess = (response) => {
    console.log('Google Sign-In Success:', response);
    // Aquí se manejaría la autenticación con el backend usando la respuesta de Google
  };

  const handleGoogleFailure = (error) => {
    console.log('Google Sign-In Failure:', error);
    alert('Error al iniciar sesión con Google');
  };

  return (
    <GoogleOAuthProvider clientId="849933662298-sd8u66b5mot8pavhoknk0q2j6mrvqcs3.apps.googleusercontent.com">
      <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#143548] mb-6 text-center">Iniciar Sesión</h2>

          {/* Formulario de inicio de sesión con correo */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#143548]">Nombre de usuario o correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#143548]">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#d3d3d3] text-gray-500 rounded-md font-semibold cursor-not-allowed mt-2"
              disabled
            >
              INICIAR SESIÓN
            </button>
          </form>

          {/* Enlace de recuperación de contraseña */}
          <div className="mt-4 text-sm text-center">
            <a href="/forgot-password" className="text-[#f29102] font-medium hover:underline">
              ¿Olvidaste tu contraseña? Haz clic aquí
            </a>
          </div>

          {/* Separador */}
          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">O</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Inicio de sesión con Google */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full flex items-center justify-center py-2 bg-white border border-gray-300 rounded-md text-[#143548] font-medium hover:bg-[#f5f5f5] transition"
                >
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google"
                    className="mr-2"
                  />
                  Iniciar sesión con Google
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
