const Submission = require('../models/Submission')
const Assignment = require('../models/Assignment');
const Team = require('../models/Team');
const mongoose =  require("mongoose");

// ✅ Create a new submission (Team Lead only)


const createSubmission = async (req, res) => {
  try {
    const { title, videoLink, topics, learningOutcomes, description } = req.body;
    const authorId = req.user._id;

    if (!title || !videoLink) {
      return res.status(400).json({ message: 'Title and video link are required.' });
    }

    // Find team of this team-lead
    const team = await Team.findOne({ teamLead: new mongoose.Types.ObjectId(authorId) });
    if (!team) {
      return res.status(400).json({ message: 'You must create a team before submitting content.' });
    }

    // Check if submission already exists for this team
    const existingSubmission = await Submission.findOne({ author: authorId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'You already submitted a video. Please update it instead.' });
    }

    // Create new submission with team ref
    const newSubmission = new Submission({
      team: team._id, // ✅ FIX
      author: authorId,
      title,
      videoLink,
      topics: Array.isArray(topics) ? topics : [topics],
      learningOutcomes,
      description,
    });

    await newSubmission.save();

    console.log("Team Found", team);
console.log('Team ID:', team?._id);

      // Populate author name before sending response
    const populatedSubmission = await newSubmission.populate('author', 'name email');

    // Mark team as submitted
    team.submitted = true;
    team.videoLink = videoLink;
    await team.save();

    res.status(201).json({
      success: true,
      message: 'Submission created successfully.',
      data: populatedSubmission,
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};




// ✅ Update submission (Team Lead)
const updateSubmission = async (req, res) => {
  try {
    const authorId = req.user._id;
    const { title, videoLink, topics, learningOutcomes, description } = req.body;

    const submission = await Submission.findOne({ author: authorId });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    if (submission.status === 'approved') {
      return res.status(400).json({ message: 'Cannot edit an approved submission.' });
    }

    if (title) submission.title = title;
    if (videoLink) submission.videoLink = videoLink;
    if (topics) submission.topics = topics;
    if (learningOutcomes) submission.learningOutcomes = learningOutcomes;
    if (description) submission.description = description;

    await submission.save();

    const populateSubmission = await submission.populate('author', 'name');

    res.status(200).json({
      success: true,
      message: 'Submission updated successfully.',
      data: populateSubmission,
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Get my submission (Team Lead)
const getMySubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({ author: req.user._id })
      .populate('author', 'name email role')
      .populate('evaluations.evaluator', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'No submission found.' });
    }

    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Get all submissions (Admin)
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('author', 'name email role')
      .populate('assignedEvaluators', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Delete submission (Admin or Team Lead)
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    if (req.user.role !== 'admin' && submission.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action.' });
    }

    await submission.deleteOne();
    res.status(200).json({ success: true, message: 'Submission deleted successfully.' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createSubmission,
  updateSubmission,
  getMySubmission,
  getAllSubmissions,
  deleteSubmission,
};
