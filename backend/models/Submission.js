const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  evaluator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // evaluator user
    required: true,
  },

  score: { type: Number, min: 0, max: 100 },
  comments: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const submissionSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedbacks: [
      {
        evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        score: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    title: { type: String, required: true },
    videoLink: { type: String, required: true },
    topics: { type: [String], default: [] },
    learningOutcomes: { type: String },
    description: { type: String },

    averageScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    assignedEvaluators: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],

    evaluations: [evaluationSchema],

    feedback: { type: String },
    averageScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
