// routes/evaluator.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


// Only logged-in evaluator can update their info
router.post('/profile', authenticate, authorizeRoles('evaluator'), async (req, res) => {
  try {
    const { address, phone, qualification, experience } = req.body;

    // Update only the provided fields
    const updatedEvaluator = await User.findByIdAndUpdate(
      req.user._id,
      { address, phone, qualification, experience },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: updatedEvaluator,
      message: 'Evaluator profile updated successfully.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
