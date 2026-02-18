const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
    },
    averageScore: { type: Number, required: true },
    rank: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
