const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

// Routes
router.post('/register-team', authenticate, authorizeRoles('team-lead'), createTeam);
router.get('/', authenticate, authorizeRoles('admin'), getAllTeams);
router.get('/:id', authenticate, authorizeRoles('team-lead'), getTeamById);
router.put('/update', authenticate,  authorizeRoles('team-lead'), updateTeam);
router.delete('/:id', authenticate, authorizeRoles('team-lead', 'admin'), deleteTeam);

module.exports = router;


