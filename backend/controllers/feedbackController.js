const Submission = require('../models/Submission');

const User = require('../models/User');
const Team = require('../models/Team');



exports.getTeamFeedback = async (req, res) => {
  try {
    const userId = req.user._id;

    const submissions = await Submission.find({ author: userId })
      .populate('feedbacks.evaluator', 'name email')
      .select('title videoLink averageScore feedbacks');

    if (!submissions.length) {
      return res.status(404).json({ message: 'No submissions found for this team lead' });
    }

    res.status(200).json({
      message: 'Feedback fetched successfully',
      submissions,
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
