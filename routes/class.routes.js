const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// Crear una clase
router.post('/classes', verifyToken, checkRole(['admin']), classController.createClass);


// Obtener clases de un curso específico
//router.get('/course/:courseId', verifyToken, classController.getClassesByCourse);

// Ruta anidada bajo cursos
router.get('/:courseId/classes', verifyToken, classController.getClassesByCourse);

// Actualizar clase
router.put('/classes/:id', verifyToken, checkRole(['admin']), classController.updateClass);

// Eliminar clase
router.delete('/classes/:id', verifyToken, checkRole(['admin']), classController.deleteClass);

module.exports = router;
