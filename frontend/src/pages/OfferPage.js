import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Importa Axios desde la carpeta src

function OfferPage() {
  const navigate = useNavigate();

  // Estados locales para los campos del formulario
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Función para manejar la carga de la imagen y la subida a Cloudinary
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si se ha seleccionado una imagen
    if (!image) {
      alert('Por favor, selecciona una imagen para subir.');
      return;
    }

    // Subida de imagen a Cloudinary
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'tikray_preset'); // Reemplaza con tu upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dw7u6tqal/image/upload', // Reemplaza con tu Cloud Name
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        // Crear el objeto con los datos del formulario
        const newObject = {
          name,
          category,
          description,
          imageUrl: data.secure_url,
          city,
        };

        // Enviar el nuevo objeto al backend
        try {
          const backendResponse = await axios.post('/objects', newObject);
          alert(backendResponse.data.message); // Mostrar el mensaje del backend

          // Limpiar el formulario
          setName('');
          setCategory('');
          setDescription('');
          setCity('');
          setImage(null);
          setImagePreview('');

          // Redirigir al inicio
          navigate('/');
        } catch (backendError) {
          console.error('Error al enviar el objeto al backend:', backendError.response?.data || backendError.message);
          alert('Error al guardar el objeto en la base de datos.');
        }
      } else {
        alert('Error al subir la imagen a Cloudinary.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema al subir la imagen.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[#143548] mb-6 text-center">¡Busquémosle un nuevo dueño! 😊</h1>

      {/* Formulario para agregar objeto */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
        {/* Campo de nombre */}
        <div>
          <label className="block text-sm text-[#143548]">Nombre del Objeto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            placeholder="Ingresa el nombre del objeto"
            required
          />
        </div>

        {/* Campo para subir imagen */}
        <div>
          <label className="block text-sm text-[#143548]">Imagen del Objeto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover mt-2 rounded-md"
            />
          )}
        </div>

        {/* Campo de categoría */}
        <div>
          <label className="block text-sm text-[#143548]">Categoría:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Libros">Libros</option>
            <option value="Muebles">Muebles</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        {/* Campo de descripción */}
        <div>
          <label className="block text-sm text-[#143548]">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            placeholder="Agrega una breve descripción del objeto"
            required
          />
        </div>

        {/* Campo de ciudad */}
        <div>
          <label className="block text-sm text-[#143548]">Ciudad:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
            required
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Lima">Lima</option>
            <option value="Arequipa">Arequipa</option>
            <option value="Tacna">Tacna</option>
          </select>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-full py-2 mr-2 bg-[#143548] text-white rounded-md font-semibold hover:bg-[#f29102] transition"
            disabled={isUploading}
          >
            {isUploading ? 'Subiendo...' : 'Agregar Objeto'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-2 ml-2 bg-gray-400 text-white rounded-md font-semibold hover:bg-gray-500 transition"
          >
            Regresar
          </button>
        </div>

        {/* Mensaje sobre verificación */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Nota: Los objetos pasarán por un proceso de verificación por parte de nuestro personal antes de subirse.
        </p>
      </form>
    </div>
  );
}

export default OfferPage;

