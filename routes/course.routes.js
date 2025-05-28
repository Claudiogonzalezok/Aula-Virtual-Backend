const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.Controller'); // Asegurate del nombre correcto
const verifyToken = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const classController = require('../controllers/classController');

// Ver todos los cursos (autenticado)
router.get('/', verifyToken, courseController.getCourses);

// Crear curso (solo admin)
router.post('/', verifyToken, isAdmin, courseController.createCourse);

// Modificar curso (solo admin)
router.put('/:id', verifyToken, isAdmin, courseController.updateCourse);

// Eliminar curso (solo admin)
router.delete('/:id', verifyToken, isAdmin, courseController.deleteCourse);

// Ruta anidada bajo cursos
{/*router.get('/:courseId/classes', verifyToken, classController.getClassesByCourse);*/}


module.exports = router;