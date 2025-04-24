// server.js
console.log('📦 Server.js mounted');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // 🧠 custom logging middleware

// Route Imports
const {
  JobsRoutes,
  UsersRoutes,
  FeedbackRoutes,
  AdminRoutes,
  DevToolsRoutes,
  AuthRoutes,
} = require('./routes');

// Mount API Routes
app.use('/api/jobs', JobsRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/feedback', FeedbackRoutes);
app.use('/api/kinks', AdminRoutes);
app.use('/api/devtools', DevToolsRoutes);
app.use('/api/auth', AuthRoutes);

// 404 Handler
app.use((req, res) => {
  console.warn('⚠️ 404 Not Found:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
