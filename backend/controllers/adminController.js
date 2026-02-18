const User = require('../models/User');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const Team = require('../models/Team')






const getDashboardData = async (req, res) => {
  try {
    // Count total evaluators
    const totalEvaluators = await User.countDocuments({ role: 'evaluator' });

    // Count total teams
    const totalTeams = await Team.countDocuments();

    // Count total submissions
    const totalSubmissions = await Submission.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalEvaluators,
        totalTeams,
        totalSubmissions,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
    });
  }
};


 


const getEvaluators = async (req, res) => {
  try {
    // Parse approved query param (true/false)
    const { approved } = req.query;

    // Build filter dynamically
    const filter = {};
    if (approved === "true") filter.approved = true;
    else if (approved === "false") filter.approved = false;

    // Fetch evaluators based on filter
    const evaluators = await User.find({ role: "evaluator", ...filter })
      .select("-password") // Exclude password for security
      .lean();

    res.status(200).json({
      success: true,
      data: evaluators,
    });
  } catch (error) {
    console.error("Error fetching evaluators:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




const assignEvaluators = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { evaluatorIds } = req.body; // array of evaluator IDs

    if (!Array.isArray(evaluatorIds) || evaluatorIds.length === 0) {
      return res.status(400).json({ message: 'Evaluator IDs are required.' });
    }

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    // Check each evaluator exists and is approved
    const evaluators = await User.find({
      _id: { $in: evaluatorIds },
      role: 'evaluator',
      approved: true,
    });

    if (evaluators.length !== evaluatorIds.length) {
      return res.status(400).json({ message: 'Some evaluators are invalid or not approved.' });
    }

    // Create assignments for each evaluator
    const assignments = await Promise.all(
      evaluators.map(async (evalUser) => {
        const assignment = new Assignment({
          submission: submissionId,
          evaluator: evalUser._id,
        });
        await assignment.save();
        return assignment;
      })
    );

    // Store assigned evaluators in submission
    submission.assignedEvaluators = evaluatorIds;
    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Evaluators assigned successfully.',
      data: assignments,
    });
  } catch (error) {
    console.error('Error assigning evaluators:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};



// ✅ Approve or reject evaluator (now handled in User model)
const approveEvaluator = async (req, res) => {
  try {
    const { evaluatorId } = req.params;
    const { approved } = req.body;

    const evaluator = await User.findOne({ _id: evaluatorId, role: 'evaluator' });
    if (!evaluator) {
      return res.status(404).json({ message: 'Evaluator not found.' });
    }

    evaluator.approved = approved;
    await evaluator.save();

    res.status(200).json({
      success: true,
      message: approved
        ? 'Evaluator approved successfully.'
        : 'Evaluator rejected successfully.',
      data: evaluator,
    });
  } catch (error) {
    console.error('Error approving evaluator:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};



// ✅ Approve or reject submission
const approveSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    submission.status = status;
    await submission.save();

    res.status(200).json({
      success: true,
      message: `Submission ${status} successfully.`,
      data: submission,
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Assign 3 evaluators automatically to approved submissions
const assignEvaluatorsToSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    if (submission.status !== 'approved') {
      return res.status(400).json({ message: 'Only approved submissions can be assigned.' });
    }

    // Get 3 random approved evaluators
    const evaluators = await User.aggregate([
      { $match: { role: 'evaluator', approved: true } },
      { $sample: { size: 3 } },
    ]);

    if (evaluators.length < 3) {
      return res.status(400).json({ message: 'Not enough approved evaluators available.' });
    }

    const assignedEvaluatorIds = evaluators.map(ev => ev._id);

    // Create assignment document
    const assignment = new Assignment({
      submission: submission._id,
      evaluators: assignedEvaluatorIds,
    });

    await assignment.save();

    // Update submission with assigned evaluators
    submission.assignedEvaluators = assignedEvaluatorIds;
    await submission.save();

    res.status(200).json({
      success: true,
      message: '3 evaluators assigned successfully.',
      data: { submission, evaluators },
    });
  } catch (error) {
    console.error('Error assigning evaluators:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Get all assignments (Admin view)
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('submission', 'title author')
      .populate('evaluators', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};



// Get all pending evaluators (not yet approved)
const getPendingEvaluators = async (req, res) => {
  try {
    const evaluators = await User.find({ role: 'evaluator', approved: false })
      .select('name email qualification experience phone address role approved createdAt')
      .sort({ createdAt: -1 });

    if (!evaluators.length) {
      return res.status(200).json({ success: true, message: 'No pending evaluators found.', data: [] });
    }

    res.status(200).json({ success: true, data: evaluators });
  } catch (error) {
    console.error('Error fetching pending evaluators:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all approved evaluators
const getApprovedEvaluators = async (req, res) => {
  try {
    const evaluators = await User.find({ role: 'evaluator', approved: true })
      .select('name email qualification experience phone address role approved createdAt')
      .sort({ createdAt: -1 });


    if (!evaluators.length) {
      return res.status(200).json({ success: true, message: 'No approved evaluators found.', data: [] });
    }

    res.status(200).json({ success: true, data: evaluators });
  } catch (error) {
    console.error('Error fetching approved evaluators:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Get all evaluators (role = 'evaluator')
const getAllEvaluators = async (req, res) => {
  try {
    const evaluators = await User.find({ role: "evaluator" }).select(
      "name email address phone qualification experience approved createdAt"
    );

    res.status(200).json(evaluators);
  } catch (error) {
    console.error("Error fetching evaluators:", error);
    res.status(500).json({ message: "Server error while fetching evaluators" });
  }
};




module.exports = {
  getDashboardData,
  getEvaluators,
  assignEvaluators,
  approveEvaluator,
  approveSubmission,
  assignEvaluatorsToSubmission,
  getAllAssignments,
  getPendingEvaluators,
  getApprovedEvaluators,
  getAllEvaluators,
};
