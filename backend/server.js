// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDB = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const authRoutes = require('./routes/authRoutes');
const evaluatorRoutes = require('./routes/evaluatorRoutes');
const teamRoutes = require('./routes/teamRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');




dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/evaluator', evaluatorRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/assignments', assignmentRoutes);







app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
