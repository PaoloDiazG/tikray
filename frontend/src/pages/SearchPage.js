import React, { useState } from 'react';

// Datos simulados para los objetos (pueden reemplazarse con datos reales más adelante)
const initialObjects = [
  { id: 1, name: 'Laptop HP', category: 'Electrónica', location: 'Arequipa' },
  { id: 2, name: 'Silla de Oficina', category: 'Muebles', location: 'Arequipa' },
  { id: 3, name: 'Chaqueta de Cuero', category: 'Ropa', location: 'Lima' },
  { id: 4, name: 'Libro de JavaScript', category: 'Libros', location: 'Lima' },
  { id: 5, name: 'Teléfono Samsung', category: 'Electrónica', location: 'Tacna' },
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
    <div>
      <h1>Búsqueda de Objetos</h1>

      {/* Barra de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Filtros de categoría y ubicación */}
      <div>
        <label>Categoría:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Muebles">Muebles</option>
          <option value="Ropa">Ropa</option>
          <option value="Libros">Libros</option>
        </select>

        <label>Ubicación:</label>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Ciudad 1">Arequipa</option>
          <option value="Ciudad 2">Lima</option>
          <option value="Ciudad 3">Tacna</option>
        </select>
      </div>

      {/* Resultados de búsqueda */}
      <div>
        {filteredObjects.length > 0 ? (
          filteredObjects.map((obj) => (
            <div key={obj.id}>
              <h2>{obj.name}</h2>
              <p>Categoría: {obj.category}</p>
              <p>Ubicación: {obj.location}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron objetos que coincidan con los criterios de búsqueda.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
