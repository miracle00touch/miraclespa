// scripts/testDbConnection.js
// Test MongoDB connection independently

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log('Environment variables:');
  console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set (hidden)' : 'NOT SET');
  console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in environment variables');
    process.exit(1);
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    maxPoolSize: 3,
    minPoolSize: 0,
    maxIdleTimeMS: 10000,
    retryWrites: true,
    retryReads: false,
  };

  try {
    console.log('Attempting to connect to MongoDB...');
    const startTime = Date.now();
    
    await mongoose.connect(process.env.MONGODB_URI, opts);
    
    const connectionTime = Date.now() - startTime;
    console.log(`✅ Connected to MongoDB successfully! (${connectionTime}ms)`);
    console.log('Connection state:', mongoose.connection.readyState);
    
    // Test a simple query
    console.log('Testing database query...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    console.log('✅ Database connection test passed!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.reason) {
      console.error('Error reason:', error.reason);
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testConnection().catch(console.error);
