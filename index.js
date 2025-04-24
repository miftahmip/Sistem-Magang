const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const ndaRoutes = require('./routes/ndaRoutes');

// Setup view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder untuk mengakses file di uploads
app.use('/uploads/nda', express.static(path.join(__dirname, 'uploads', 'nda')));
app.use('/uploads/nda_template', express.static(path.join(__dirname, 'uploads', 'nda_template')));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);       // semua route admin mulai dari /admin
app.use('/peserta', pesertaRoutes);   // semua route peserta mulai dari /peserta
app.use('/nda', ndaRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server nyala di http://localhost:3000');
});

