const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getHelpRequests,
  getDisasterReports,
} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/help-requests', protect, getHelpRequests);
router.get('/disaster-reports', protect, getDisasterReports);

module.exports = router;
