const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'scored'],
      default: 'pending',
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    comments: {
      type: String,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    scoredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Automatically update timestamps
assignmentSchema.pre('save', function (next) {
  if (this.isModified('score')) {
    this.status = 'scored';
    this.scoredAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Assignment', assignmentSchema);
