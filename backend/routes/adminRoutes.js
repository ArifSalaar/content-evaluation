const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  getEvaluators,
    assignEvaluators,
  approveEvaluator,
  approveSubmission,
  assignEvaluatorsToSubmission,
  getAllAssignments,
  getPendingEvaluators,
  getApprovedEvaluators,
  getAllEvaluators
} = require('../controllers/adminController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');








router.get('/get-all-evaluators', authenticate, authorizeRoles('admin'), getAllEvaluators);

router.post('/assign/:submissionId',authenticate, authorizeRoles('admin'), assignEvaluators);


router.get('/evaluators', authenticate, authorizeRoles('admin'), getEvaluators);

router.get('/evaluators/pending', authenticate,  authorizeRoles('admin'), getPendingEvaluators);
router.get('/evaluators/approved', authenticate,  authorizeRoles('admin'), getApprovedEvaluators);



router.get('/dashboard-data', authenticate, authorizeRoles('admin'), getDashboardData);


// Evaluator management
router.put('/evaluator/:evaluatorId/approve', authenticate, authorizeRoles('admin'), approveEvaluator);

// Submission management
router.put('/submission/:submissionId/status', authenticate, authorizeRoles('admin'), approveSubmission);
router.post('/submission/:submissionId/assign', authenticate, authorizeRoles('admin'), assignEvaluatorsToSubmission);

// Assignment management
router.get('/assignments', authenticate, authorizeRoles('admin'), getAllAssignments);

module.exports = router;
