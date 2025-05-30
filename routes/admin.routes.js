const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.use(verifyToken, checkRole(['admin']));

// Gestión de usuarios
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Cursos y clases pueden ser gestionados desde sus controladores existentes

module.exports = router;
