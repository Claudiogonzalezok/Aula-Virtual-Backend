const express = require('express');
const router = express.Router();
const { createClass } = require('../controllers/class.controller');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createClass);

module.exports = router;
