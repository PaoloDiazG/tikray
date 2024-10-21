import React, { useState } from 'react';

function OfferPage() {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Función para manejar la subida de imágenes a Cloudinary
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'tikray_preset'); // Reemplaza con tu upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dw7u6tqal/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        alert('¡Imagen subida con éxito!');
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema al subir la imagen.');
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !category || !imageUrl) {
      alert('Por favor, completa todos los campos y sube una imagen.');
      return;
    }

    const newObject = {
      name,
      description,
      category,
      imageUrl,
    };

    console.log('Objeto agregado:', newObject);
    alert('¡Objeto agregado con éxito!');
    // Aquí se enviarán los datos al backend o se actualizará el estado de Redux

    // Limpiar el formulario
    setName('');
    setDescription('');
    setCategory('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <div>
      <h1>Ofertar un Nuevo Objeto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Objeto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Categoría:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Libros">Libros</option>
            <option value="Muebles">Muebles</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button type="button" onClick={handleImageUpload}>Subir Imagen</button>
        </div>

        <button type="submit">Agregar Objeto</button>
      </form>
    </div>
  );
}

export default OfferPage;

