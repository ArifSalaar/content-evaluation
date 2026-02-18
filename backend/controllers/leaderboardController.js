const Submission = require('../models/Submission');
const Team = require('../models/Team');

// ✅ Get leaderboard sorted by average score
exports.getLeaderboard = async (req, res) => {
  try {
    // Get all evaluated submissions with their team info
    const submissions = await Submission.find({ status: 'evaluated' })
      .populate('author', 'name email')
      .populate({
        path: 'team',
        select: 'teamName members',
      })
      .sort({ averageScore: -1 }); // highest score first

    // If no evaluated submissions yet
    if (!submissions.length) {
      return res.status(200).json({
        message: 'No evaluated submissions yet',
        leaderboard: [],
      });
    }

    // Create leaderboard structure
    const leaderboard = submissions.map((sub, index) => ({
      rank: index + 1,
      teamName: sub.team?.teamName || 'N/A',
      projectTitle: sub.title,
      averageScore: sub.averageScore?.toFixed(2),
      videoLink: sub.videoLink,
      topic: sub.topics,
      learningOutcomes: sub.learningOutcomes,
      authorName: sub.author?.name,
      createdAt: sub.createdAt,
    }));

    res.status(200).json({
      message: 'Leaderboard fetched successfully',
      totalTeams: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
