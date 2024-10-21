import React, { useState } from 'react';

// Datos simulados para los objetos (pueden reemplazarse con datos reales más adelante)
const initialObjects = [
  { id: 1, name: 'Laptop HP', category: 'Electrónica', location: 'Ciudad A', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Silla de Oficina', category: 'Muebles', location: 'Ciudad B', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Chaqueta de Cuero', category: 'Ropa', location: 'Ciudad A', imageUrl: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Libro de JavaScript', category: 'Libros', location: 'Ciudad C', imageUrl: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Teléfono Samsung', category: 'Electrónica', location: 'Ciudad B', imageUrl: 'https://via.placeholder.com/150' },
];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredObjects, setFilteredObjects] = useState(initialObjects);

  // Función para manejar la búsqueda y el filtrado
  const handleSearch = () => {
    let results = initialObjects;

    // Filtrar por nombre si hay un término de búsqueda
    if (searchTerm) {
      results = results.filter((obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría si hay una categoría seleccionada
    if (categoryFilter) {
      results = results.filter((obj) => obj.category === categoryFilter);
    }

    // Filtrar por ubicación si hay una ubicación seleccionada
    if (locationFilter) {
      results = results.filter((obj) => obj.location === locationFilter);
    }

    // Actualizar los resultados filtrados
    setFilteredObjects(results);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#143548] mb-6 text-center">¿Qué estas buscando hoy? 🤔</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
        >
          <option value="">Categoría (todas)</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Muebles">Muebles</option>
          <option value="Ropa">Ropa</option>
          <option value="Libros">Libros</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f29102]"
        >
          <option value="">Ubicación (todas)</option>
          <option value="Ciudad A">Ciudad A</option>
          <option value="Ciudad B">Ciudad B</option>
          <option value="Ciudad C">Ciudad C</option>
        </select>

        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-4 py-2 bg-[#143548] text-white rounded-md font-semibold hover:bg-[#f29102] transition"
        >
          Buscar
        </button>
      </div>

      {/* Resultados de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObjects.length > 0 ? (
          filteredObjects.map((obj) => (
            <div
              key={obj.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#143548]">{obj.name}</h2>
                <p className="text-sm text-gray-600">Categoría: {obj.category}</p>
                <p className="text-sm text-gray-600">Ubicación: {obj.location}</p>
                <button
                  onClick={() => window.location.href = `/chat?user=${obj.id}`}
                  className="mt-3 w-full px-4 py-2 bg-[#f29102] text-white rounded-md font-medium hover:bg-[#d57c01] transition"
                >
                  Me interesa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No se encontraron objetos que coincidan con los criterios de búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
