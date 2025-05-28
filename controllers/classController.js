const Class = require('../models/Class');

// Crear una nueva clase
exports.createClass = async (req, res) => {
  try {
    const { title, description, date, course, files } = req.body;

    if (!course) {
      return res.status(400).json({ error: 'El ID del curso es obligatorio' });
    }

    const newClass = new Class({
      title,
      description,
      date,
      course,
      files
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las clases de un curso
exports.getClassesByCourse = async (req, res) => {
  try {
    const classes = await Class.find({ course: req.params.courseId }).sort({ date: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una clase
exports.updateClass = async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una clase
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clase eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
