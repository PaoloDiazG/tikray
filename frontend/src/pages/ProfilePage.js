import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

function ProfilePage() {
  // Obtener la información del usuario del estado de Redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Estados locales para los campos editables
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  // Función para manejar la actualización del usuario
  const handleUpdate = () => {
    dispatch(updateUser({ name, email }));
    alert('Información actualizada!');
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
}

export default ProfilePage;
