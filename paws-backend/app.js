const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced Database Connection with Connection Testing
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Verify connection by listing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to database before starting server
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const status = dbStatus === 1 ? 'healthy' : 'unhealthy';
  res.json({
    status,
    database: dbStatus === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Periodic connection check (optional)
  setInterval(() => {
    const state = mongoose.connection.readyState;
    console.log('MongoDB connection state:', 
      state === 0 ? 'disconnected' :
      state === 1 ? 'connected' :
      state === 2 ? 'connecting' :
      'disconnecting'
    );
  }, 60000); // Check every minute
});