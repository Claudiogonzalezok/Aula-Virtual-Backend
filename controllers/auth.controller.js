const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

{/*const registerUser = async (req, res) => {
const { name, email, role, password } = req.body;
 const data= req.body;
    console.log(data)

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
*/}
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
  

module.exports = { registerUser, loginUser };
