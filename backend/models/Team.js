const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, trim: true },

    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one team per teamLead
    },

    members: {
      type: [memberSchema],
      validate: [v => v.length <= 4, 'Maximum 4 additional members allowed'],
    },

    projectTitle: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true },
    topic: { type: String, required: true },
    learningOutcomes: { type: String, required: true },

    submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
