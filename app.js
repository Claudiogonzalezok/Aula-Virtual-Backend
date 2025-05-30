const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Config
dotenv.config();
const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/private', require('./routes/private.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api', require('./routes/class.routes')); // Ya actualizada como te mostré antes

//const courseRoutes = require('./routes/course.routes');
//app.use('/api/courses', courseRoutes);
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
