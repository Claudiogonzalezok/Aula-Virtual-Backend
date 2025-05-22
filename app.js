const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
const privateRoutes = require('./routes/private.routes');
app.use('/api/private', privateRoutes);
//ruta remporal de pruebas de cursos
const courseRoutes = require('./routes/course.routes');
app.use('/api/courses', courseRoutes);
//Ruta para clases
const classRoutes = require('./routes/class.routes');
app.use('/api/courses', courseRoutes);


// Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
