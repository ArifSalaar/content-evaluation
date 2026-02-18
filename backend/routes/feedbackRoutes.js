const express = require('express');
const router = express.Router();
const { getDashboardData, getTeamFeedback } = require('../controllers/feedbackController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');




router.get('/', authenticate, authorizeRoles('team-lead'), getTeamFeedback);

module.exports = router;
