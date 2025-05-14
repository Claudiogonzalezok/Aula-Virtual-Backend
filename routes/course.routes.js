const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Ruta de prueba: crear un curso (temporal)
router.post('/test-course', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    const newCourse = new Course({ title, description, createdBy });
    await newCourse.save();

    res.status(201).json({ msg: 'Curso creado', course: newCourse });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
});

module.exports = router;
