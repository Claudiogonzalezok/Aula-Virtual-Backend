const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

exports.createUser = async (req, res) => {
const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    role,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: 'Usuario creado correctamente', user });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar usuario' });
  }
};
