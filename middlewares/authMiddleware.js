const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Invalid token.' });
  }
};

module.exports = verifyToken;
