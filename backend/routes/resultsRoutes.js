const express = require('express');
const router = express.Router();
const {
  publishResults,
  viewResults,
  reopenCompetition,
} = require('../controllers/resultsController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// 🟢 Public route — anyone can view final results
router.get('/', viewResults);

// 🔵 Admin — publish results
router.post('/publish', authenticate, authorizeRoles('admin'), publishResults);

// 🟠 Admin — reopen competition (optional)
router.put('/reopen', authenticate, authorizeRoles('admin'), reopenCompetition);

module.exports = router;
