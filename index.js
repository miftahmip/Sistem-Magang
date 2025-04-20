const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);       // semua route admin mulai dari /admin
app.use('/peserta', pesertaRoutes);   // semua route peserta mulai dari /peserta

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server nyala di http://localhost:3000');
});

