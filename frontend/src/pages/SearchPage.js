import React, { useState } from 'react';

// Datos simulados para los objetos
const initialObjects = [
  { id: 1, name: 'Laptop HP', category: 'Electrónica', location: 'Ciudad A' },
  { id: 2, name: 'Silla de Oficina', category: 'Muebles', location: 'Ciudad B' },
  { id: 3, name: 'Chaqueta de Cuero', category: 'Ropa', location: 'Ciudad A' },
  { id: 4, name: 'Libro de JavaScript', category: 'Libros', location: 'Ciudad C' },
  { id: 5, name: 'Teléfono Samsung', category: 'Electrónica', location: 'Ciudad B' },
];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredObjects, setFilteredObjects] = useState(initialObjects);

  // Función para manejar la búsqueda y el filtrado
  const handleSearch = () => {
    let results = initialObjects;

    if (searchTerm) {
      results = results.filter((obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter((obj) => obj.category === categoryFilter);
    }

    if (locationFilter) {
      results = results.filter((obj) => obj.location === locationFilter);
    }

    setFilteredObjects(results);
  };

  return (
    <div style={styles.container}>
      <h1>Búsqueda de Objetos</h1>

      {/* Barra de búsqueda */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Buscar</button>
      </div>

      {/* Filtros de categoría y ubicación */}
      <div style={styles.filters}>
        <label>Categoría:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.filterSelect}
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
          style={styles.filterSelect}
        >
          <option value="">Todas</option>
          <option value="Ciudad A">Ciudad A</option>
          <option value="Ciudad B">Ciudad B</option>
          <option value="Ciudad C">Ciudad C</option>
        </select>
      </div>

      {/* Resultados de búsqueda */}
      <div style={styles.resultsContainer}>
        {filteredObjects.length > 0 ? (
          filteredObjects.map((obj) => (
            <div key={obj.id} style={styles.objectCard}>
              <img src="https://via.placeholder.com/150" alt={obj.name} style={styles.objectImage} />
              <h3>{obj.name}</h3>
              <p>Categoría: {obj.category}</p>
              <p>Ubicación: {obj.location}</p>

              {/* Botón "Me interesa" */}
              <button
                onClick={() => window.location.href = `/chat?user=${obj.id}`}
                style={styles.interestedButton}
              >
                Me interesa
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron objetos que coincidan con los criterios de búsqueda.</p>
        )}
      </div>
    </div>
  );
}

// Estilos en línea para SearchPage.js
const styles = {
  container: {
    padding: '20px',
  },
  searchBar: {
    display: 'flex',
    marginBottom: '20px',
  },
  searchInput: {
    flexGrow: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  filters: {
    marginBottom: '20px',
  },
  filterSelect: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  objectCard: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    width: '200px',
  },
  objectImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  interestedButton: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '5px',
  },
};

export default SearchPage;
