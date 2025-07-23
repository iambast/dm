// routes/disasterRoutes.js
const express = require('express');
const router = express.Router();
const { getAllDisasters, reportDisaster } = require('../controllers/disasterController');

// Correct usage: handler must be a function
router.get('/', getAllDisasters);
router.post('/report', reportDisaster);

module.exports = router;
