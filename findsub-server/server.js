const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const {
  JobsRoutes,
  UsersRoutes,
  FeedbackRoutes,
  AdminRoutes,
  DevToolsRoutes,
  AuthRoutes,
} = require('./routes');

// Middleware
app.use(cors());
app.use(express.json());

// Route Mounts
app.use('/api/jobs', JobsRoutes);
app.use('/api/user', UsersRoutes);
app.use('/api/feedback', FeedbackRoutes);
app.use('/api/kinks', AdminRoutes);
app.use('/api/devtools', DevToolsRoutes);
app.use('/api/auth', AuthRoutes);

// DB Connect (example URI, replace with actual config)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/findsub-dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
