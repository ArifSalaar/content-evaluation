const Team = require('../models/Team');

// ✅ Create Team (Only Team Lead)
const createTeam = async (req, res) => {
  try {
    const { teamName, members, projectTitle, projectDescription, topic, learningOutcomes, videoLink } = req.body;
    const teamLeadId = req.user._id;

    if (!teamName || !projectTitle || !projectDescription || !topic || !learningOutcomes) {
      return res.status(400).json({ message: 'All required fields are needed.' });
    }

    const existingTeam = await Team.findOne({ teamLead: teamLeadId });
    if (existingTeam) {
      return res.status(400).json({ message: 'You already created a team.' });
    }

    if (!members || members.length < 1 || members.length > 4) {
      return res.status(400).json({ message: 'Team must have 1–4 members.' });
    }

    const newTeam = new Team({
      teamName,
      teamLead: teamLeadId,
      members,
      projectTitle,
      projectDescription,
      topic,
      learningOutcomes,
      videoLink,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: 'Team created successfully.',
      data: newTeam,
    });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// ✅ Get all teams (Admin only)
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('teamLead', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Get single team (by team lead or admin)
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('teamLead', 'name email role');

    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    // Restrict non-admin users
    if (req.user.role !== 'admin' && team.teamLead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Update team (Only Team Lead)
const updateTeam = async (req, res) => {
  try {
    const teamLeadId = req.user._id;
    const { teamName, members, projectTitle, projectDescription, topic, learningOutcomes, videoLink } = req.body;

    const team = await Team.findOne({ teamLead: teamLeadId });
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    // Update fields
    if (teamName) team.teamName = teamName;
    if (members) team.members = members;
    if (projectTitle) team.projectTitle = projectTitle;
    if (projectDescription) team.projectDescription = projectDescription;
    if (topic) team.topic = topic;
    if (learningOutcomes) team.learningOutcomes = learningOutcomes;
    if (videoLink) team.videoLink = videoLink;

    await team.save();

    res.status(200).json({
      success: true,
      message: 'Team updated successfully.',
      data: team,
    });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Delete team (Only Team Lead or Admin)
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    if (req.user.role !== 'admin' && team.teamLead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action.' });
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Team deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
