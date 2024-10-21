const Object = require('../models/Object');

// Crear un nuevo objeto
exports.createObject = async (req, res) => {
  const { name, category, description, imageUrl, owner } = req.body;

  try {
    const newObject = new Object({ name, category, description, imageUrl, owner });
    await newObject.save();

    res.status(201).json({ msg: 'Objeto creado exitosamente', object: newObject });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el objeto', error });
  }
};

// Obtener todos los objetos
exports.getObjects = async (req, res) => {
  try {
    const objects = await Object.find().populate('owner', 'name email');
    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los objetos', error });
  }
};

// Obtener un objeto por ID
exports.getObjectById = async (req, res) => {
  try {
    const object = await Object.findById(req.params.id).populate('owner', 'name email');
    if (!object) return res.status(404).json({ msg: 'Objeto no encontrado' });

    res.status(200).json(object);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el objeto', error });
  }
};

// Buscar objetos con filtrado y paginación
exports.searchObjects = async (req, res) => {
  const { name, category, location, page = 1, limit = 10 } = req.query;

  // Crear filtros de búsqueda dinámicamente
  let filters = {};

  if (name) {
    filters.name = { $regex: name, $options: 'i' }; // Búsqueda insensible a mayúsculas
  }
  if (category) {
    filters.category = category;
  }
  if (location) {
    filters.location = { $regex: location, $options: 'i' };
  }

  try {
    // Calcular el número de resultados que se deben omitir para la paginación
    const skip = (page - 1) * limit;

    // Buscar objetos con los filtros y aplicar paginación
    const objects = await Object.find(filters)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('owner', 'name email');

    // Calcular el total de objetos que coinciden con los filtros
    const total = await Object.countDocuments(filters);

    res.status(200).json({
      objects,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar objetos', error });
  }
};


// Eliminar un objeto
exports.deleteObject = async (req, res) => {
  try {
    const object = await Object.findByIdAndDelete(req.params.id);
    if (!object) return res.status(404).json({ msg: 'Objeto no encontrado' });

    res.status(200).json({ msg: 'Objeto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el objeto', error });
  }
};
