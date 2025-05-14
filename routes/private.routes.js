const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
  res.json({
    msg: 'Access granted to protected route',
    user: req.user
  });
});

module.exports = router;