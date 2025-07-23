// routes/helpRequestRoutes.js
const express = require('express');
const router = express.Router();
const { requestHelp, getAllHelpRequests } = require('../controllers/helpRequestController');

router.post('/request', requestHelp);       // POST /api/help-requests/request
router.get('/', getAllHelpRequests);        // GET /api/help-requests/

module.exports = router;
