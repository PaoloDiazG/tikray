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
    <div>
      {/* Banner de bienvenida */}
      <div style={styles.banner}>
        <h1 style={styles.bannerText}>¡Bienvenido a Tikray!</h1>
        <p style={styles.bannerSubText}>
          La mejor plataforma para el intercambio de objetos. Encuentra lo que necesitas y ofrece lo que ya no usas.
        </p>
        <Link to="/search" style={styles.searchButton}>
          ¿Qué estás buscando hoy?
        </Link>
      </div>

      {/* Sección de categorías */}
      <div style={styles.section}>
        <h2>Categorías Populares</h2>
        <div style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <Link to={`/search?category=${category}`} key={index} style={styles.categoryBox}>
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Sección de objetos destacados */}
      <div style={styles.section}>
        <h2>Objetos Destacados</h2>
        <div style={styles.objectContainer}>
          {featuredObjects.map((obj) => (
            <div key={obj.id} style={styles.objectCard}>
              <img src={obj.imageUrl} alt={obj.name} style={styles.objectImage} />
              <h3>{obj.name}</h3>
              <p>Categoría: {obj.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Estilos en línea para mejorar el diseño
const styles = {
  banner: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
  },
  bannerText: {
    fontSize: '36px',
    margin: '0',
  },
  bannerSubText: {
    fontSize: '18px',
    margin: '10px 0 20px',
  },
  searchButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#4CAF50',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  section: {
    padding: '20px',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  categoryBox: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#333',
  },
  objectContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  objectCard: {
    padding: '10px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    width: '150px',
  },
  objectImage: {
    width: '100%',
    borderRadius: '5px',
  },
};

export default HomePage;
