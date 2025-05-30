const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.get('/', verifyToken, checkRole(['admin']), userController.getAllUsers);
router.post('/', verifyToken, checkRole(['admin']), userController.createUser);
router.put('/:id', verifyToken, checkRole(['admin']), userController.updateUser);
router.delete('/:id', verifyToken, checkRole(['admin']), userController.deleteUser);

module.exports = router;