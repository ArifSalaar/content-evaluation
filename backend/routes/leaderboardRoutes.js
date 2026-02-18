const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


// 🟢 Public leaderboard (visible to all)
router.get('/', getLeaderboard);

// 🔵 Admin can also view the same (optionally protected)
router.get('/admin', authenticate, authorizeRoles('admin'), getLeaderboard);

module.exports = router;
