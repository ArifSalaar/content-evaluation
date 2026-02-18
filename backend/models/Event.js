// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  submissionStart: {
    type: Date,
    required: true,
  },
  submissionDeadline: {
    type: Date,
    required: true,
  },
  evaluationStart: {
    type: Date,
    required: true,
  },
  evaluationDeadline: {
    type: Date,
    required: true,
  },
  resultsPublishAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'submission', 'evaluation', 'results', 'completed'],
    default: 'upcoming',
  },
  criteriaVersion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Criterion',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // admin who created the event
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update `status` based on current date
EventSchema.methods.updateStatus = function () {
  const now = new Date();
  if (now < this.submissionStart) this.status = 'upcoming';
  else if (now >= this.submissionStart && now <= this.submissionDeadline) this.status = 'submission';
  else if (now > this.submissionDeadline && now <= this.evaluationDeadline) this.status = 'evaluation';
  else if (now > this.evaluationDeadline && now <= this.resultsPublishAt) this.status = 'results';
  else this.status = 'completed';
};

// Update `updatedAt` before saving
EventSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Event', EventSchema);
