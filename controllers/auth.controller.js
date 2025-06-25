const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendResetEmail = require('../utils/sendEmail');

//Registro de usuarios
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
      const data= req.body;
    console.log(data)
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'El Usuario ya existe' });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ msg: 'Usuario registrado Correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error de Servidor', error });
  }
};

//Login de usuarios
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const data= req.body;
    console.log(data)
  
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ msg: 'Credenciales Invalidas' });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ msg: 'Credenciales Invalidas' });
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({
        msg: 'Se logeo exitozamente',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ msg: 'Error de Servidor', error });
    }
  };

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;
    await sendResetEmail(user.email, resetUrl); // ✅ <- corrección clave

    res.json({ msg: 'Se envió el enlace de recuperación al correo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: 'Token inválido o expirado' });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ msg: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Token inválido o expirado' });
  }
};
  

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
