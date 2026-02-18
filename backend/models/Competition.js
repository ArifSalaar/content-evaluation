const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'Content Evaluation Competition' },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  announcementDate: { type: Date },
  leaderboard: [
    {
      teamName: String,
      projectTitle: String,
      averageScore: Number,
      rank: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);
