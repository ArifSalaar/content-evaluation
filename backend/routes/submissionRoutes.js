const express = require('express');
const router = express.Router();
const {
  createSubmission,
  updateSubmission,
  getMySubmission,
  getAllSubmissions,
  deleteSubmission,
} = require('../controllers/submissionController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// Team Lead Routes
router.post('/', authenticate, authorizeRoles('team-lead'), createSubmission);
router.put('/:id', authenticate, authorizeRoles('team-lead'), updateSubmission);
router.get('/my', authenticate, authorizeRoles('team-lead'), getMySubmission);

// Admin Routes
router.get('/', authenticate, authorizeRoles('admin', 'team-lead'), getAllSubmissions);
router.delete('/:id', authenticate, authorizeRoles('admin', 'team-lead'), deleteSubmission);

module.exports = router;


