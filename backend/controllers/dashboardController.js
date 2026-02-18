const User = require('../models/User');
const Team = require('../models/Team');
const Submission = require('../models/Submission');

exports.getDashboardData = async (req, res) => {
  try {
    // Count total evaluators
    const totalEvaluators = await User.countDocuments({ role: 'evaluator' });

    // Total teams Count
    const totalTeams = await Team.countDocuments();

    // Count total submissions in Dashbaord
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
