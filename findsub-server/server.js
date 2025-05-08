// ==============================================
// 📦 File: server.js
// Purpose: Entry point — configure Express app, database connection, and API routes
// Standards:
// - Uses camelCase
// - Centralized error handling
// - Console logs on file load
// ==============================================

console.log('📦 Server.js mounted');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middlewares/logger'); // 🧠 Custom middleware for request logging

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware setup
app.use(cors());
app.use(express.json());
app.use(logger);

// ✅ Route imports
const {
  JobsRoutes,
  UsersRoutes,
  FeedbackRoutes,
  AdminRoutes,
  DevToolsRoutes,
  AuthRoutes,
  ApplicationRoutes, // ✅ NEW: Applications route
} = require('./routes');

// ✅ Mount API Routes
app.use('/api/jobs', JobsRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/feedback', FeedbackRoutes);
app.use('/api/kinks', AdminRoutes);
app.use('/api/devtools', DevToolsRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/applications', ApplicationRoutes); // ✅ NEW route mounted

// ✅ 404 Handler
app.use((req, res) => {
  console.warn('⚠️ 404 Not Found:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
