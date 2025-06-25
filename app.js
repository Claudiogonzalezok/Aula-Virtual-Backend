const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');

// Config
dotenv.config();
const app = express();
connectDB();
const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


// Routes
//const userRoutes = require('./routes/user.routes');
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users',  require('./routes/user.routes'));
app.use('/api/private', require('./routes/private.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api', require('./routes/class.routes')); // Ya actualizada como te mostré antes

app.use('/api', require('./routes/uploads'));
// Servir archivos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
