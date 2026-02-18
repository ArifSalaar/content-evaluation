const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const User = require('../models/User');

// ✅ Auto-assign 3 evaluators to a submission
exports.assignEvaluators = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Get 3 random approved evaluators (from User collection)
    const evaluators = await User.aggregate([
      { $match: { role: 'evaluator', approved: true } },
      { $sample: { size: 3 } },
    ]);

    if (evaluators.length < 3) {
      return res.status(400).json({ message: 'Not enough approved evaluators available' });
    }

    // Create assignments
    const assignments = [];
    for (const evaluator of evaluators) {
      const existing = await Assignment.findOne({
        submission: submissionId,
        evaluator: evaluator._id,
      });
      if (!existing) {
        const assignment = await Assignment.create({
          submission: submissionId,
          evaluator: evaluator._id,
        });
        assignments.push(assignment);
      }
    }

    // Update submission status
    submission.status = '';
    await submission.save();

    res.status(201).json({
      message: 'Evaluators assigned successfully',
      assignedEvaluators: evaluators.map((e) => ({
        id: e._id,
        name: e.name,
        email: e.email,
      })),
    });
  } catch (error) {
    console.error('Error assigning evaluators:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Evaluator submits score & feedback + push to submission feedbacks
exports.submitScore = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { score, comments } = req.body;
    const evaluatorId = req.user._id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (assignment.evaluator.toString() !== evaluatorId.toString()) {
      return res.status(403).json({ message: 'Unauthorized: not your assignment' });
    }

    // Update assignment
    assignment.score = score;
    assignment.comments = comments;
    assignment.status = 'scored';
    assignment.scoredAt = new Date();
    await assignment.save();

    // ✅ Push feedback to Submission
    const submission = await Submission.findById(assignment.submission);
    if (submission) {
      const existingFeedback = submission.feedbacks.find(
        (f) => f.evaluator.toString() === evaluatorId.toString()
      );

      if (existingFeedback) {
        existingFeedback.comment = comments;
        existingFeedback.score = score;
        existingFeedback.date = new Date();
      } else {
        submission.feedbacks.push({
          evaluator: evaluatorId,
          comment: comments,
          score,
        });
      }

      await submission.save();
      // ✅ Recalculate average score
      await calculateAverageScore(submission._id);
    }

    res.status(200).json({
      message: 'Score and feedback submitted successfully',
      assignment,
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// ✅ Get all assignments of an evaluator
exports.getEvaluatorAssignments = async (req, res) => {
  try {
    const evaluatorId = req.user._id;
    const assignments = await Assignment.find({ evaluator: evaluatorId })
      .populate('submission', 'title videoLink status')
      .populate('evaluator', 'name email');

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get all assignments of a specific submission (for Admin)
exports.getSubmissionAssignments = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const assignments = await Assignment.find({ submission: submissionId })
      .populate('evaluator', 'name email')
      .populate('submission', 'title videoLink');

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Helper: Calculate average score and update submission
const calculateAverageScore = async (submissionId) => {
  const assignments = await Assignment.find({
    submission: submissionId,
    status: 'scored',
  });

  if (assignments.length === 0) return;

  const totalScore = assignments.reduce((sum, a) => sum + a.score, 0);
  const average = totalScore / assignments.length;

  const submission = await Submission.findById(submissionId);
  submission.averageScore = average;

  // ✅ If all 3 evaluators submitted → mark as evaluated
  const totalAssignments = await Assignment.countDocuments({ submission: submissionId });
  if (assignments.length === totalAssignments && totalAssignments === 3) {
    submission.status = 'evaluated';
  }

  await submission.save();
};
