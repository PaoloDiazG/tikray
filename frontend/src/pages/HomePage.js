import React from 'react';
import { Link } from 'react-router-dom';

// Datos simulados para categorías y objetos
const categories = ['Electrónica', 'Ropa', 'Libros', 'Muebles', 'Otros'];
const featuredObjects = [
  { id: 1, name: 'Laptop HP', category: 'Electrónica', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Chaqueta de Cuero', category: 'Ropa', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Libro de JavaScript', category: 'Libros', imageUrl: 'https://via.placeholder.com/150' },
];

function HomePage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Banner de bienvenida */}
      <div className="bg-[#143548] text-white text-center py-12">
        <h1 className="text-4xl font-bold">¡Bienvenido a Tikray!</h1>
        <p className="text-lg mt-2">
          La mejor plataforma para el intercambio de objetos. Encuentra lo que necesitas y ofrece lo que ya no usas.
        </p>
        <Link
          to="/search"
          className="mt-6 inline-block px-6 py-2 bg-[#f29102] text-white rounded-full font-semibold hover:bg-[#d57c01] transition"
        >
          Comienza a Buscar
        </Link>
      </div>

      {/* Sección de categorías */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-[#143548] mb-4">Categorías Populares</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <Link
              to={`/search?category=${category}`}
              key={index}
              className="bg-[#143548] text-white px-4 py-2 rounded-lg hover:bg-[#f29102] transition"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Sección de objetos destacados */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-[#143548] mb-4">Objetos Destacados</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {featuredObjects.map((obj) => (
            <div
              key={obj.id}
              className="bg-white shadow-md rounded-lg overflow-hidden w-48"
            >
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#143548]">{obj.name}</h3>
                <p className="text-sm text-gray-600">Categoría: {obj.category}</p>
                <Link
                  to={`/chat?user=${obj.id}`}
                  className="mt-3 inline-block px-4 py-2 bg-[#f29102] text-white rounded-full font-medium hover:bg-[#d57c01] transition"
                >
                  Me interesa
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
