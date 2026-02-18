const Competition = require('../models/Competition');
const Submission = require('../models/Submission');

// ✅ Admin publishes final results
exports.publishResults = async (req, res) => {
  try {
    // Get top evaluated submissions
    const submissions = await Submission.find({ status: 'evaluated' })
      .populate('team', 'teamName')
      .sort({ averageScore: -1 });

    if (!submissions.length) {
      return res.status(400).json({ message: 'No evaluated submissions found' });
    }

    // Create leaderboard snapshot
    const leaderboard = submissions.map((s, index) => ({
      teamName: s.team?.teamName || 'N/A',
      projectTitle: s.title,
      averageScore: s.averageScore,
      rank: index + 1,
    }));

    // Create or update competition record
    let competition = await Competition.findOne();
    if (!competition) {
      competition = new Competition();
    }

    competition.status = 'completed';
    competition.announcementDate = new Date();
    competition.leaderboard = leaderboard;

    await competition.save();

    res.status(200).json({
      message: 'Results published successfully',
      announcementDate: competition.announcementDate,
      leaderboard,
    });
  } catch (error) {
    console.error('Error publishing results:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Public: View published results
exports.viewResults = async (req, res) => {
  try {
    const competition = await Competition.findOne({ status: 'completed' });
    if (!competition) {
      return res.status(404).json({ message: 'Results not published yet' });
    }

    res.status(200).json({
      message: 'Final results fetched successfully',
      announcementDate: competition.announcementDate,
      leaderboard: competition.leaderboard,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Admin can reset or reopen competition if needed
exports.reopenCompetition = async (req, res) => {
  try {
    const competition = await Competition.findOne();
    if (!competition) {
      return res.status(404).json({ message: 'Competition record not found' });
    }

    competition.status = 'active';
    competition.announcementDate = null;
    competition.leaderboard = [];

    await competition.save();

    res.status(200).json({ message: 'Competition reopened successfully' });
  } catch (error) {
    console.error('Error reopening competition:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
