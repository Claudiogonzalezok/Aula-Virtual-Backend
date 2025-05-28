const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// Crear una clase
router.post('/:courseId/classes', verifyToken, checkRole(['admin', 'professor']), classController.createClass);


// Obtener clases de un curso específico
//router.get('/course/:courseId', verifyToken, classController.getClassesByCourse);

// Ruta anidada bajo cursos
router.get('/:courseId/classes', verifyToken, classController.getClassesByCourse);

// Actualizar clase
router.put('/:courseId/classes/:id', verifyToken, checkRole(['admin', 'professor']), classController.updateClass);

// Eliminar clase
router.delete('/:courseId/classes/:id', verifyToken, checkRole(['admin', 'professor']), classController.deleteClass);

module.exports = router;
