const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },

    role: {
      type: String,
      enum: ['team-lead', 'evaluator', 'admin'],
      default: 'evaluator',
    },

    // Evaluator biodata (filled if role = evaluator)
    address: { type: String },
    phone: { type: String },
    qualification: { type: String },
    experience: { type: String },
    approved: { type: Boolean, default: false }, // admin approval for evaluators
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
