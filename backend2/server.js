
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const disasterRoutes = require('./routes/disasterRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express(); // ✅ moved before any `app.use`

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/help-requests', helpRequestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
