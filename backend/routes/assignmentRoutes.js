const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const {
  // assignEvaluators,
  submitScore,
  getEvaluatorAssignments,
  getSubmissionAssignments,
} = require('../controllers/assignmentController');







// 🟠 Evaluator submits score
router.put('/score/:assignmentId', authenticate, authorizeRoles('evaluator'), submitScore);

// 🟣 Evaluator views their assigned submissions
router.get('/my-assignments', authenticate, authorizeRoles('evaluator'), getEvaluatorAssignments);

// 🔵 Admin views all evaluators assigned to a submission
router.get('/submission/:submissionId', authenticate, authorizeRoles('admin'), getSubmissionAssignments);





module.exports = router;