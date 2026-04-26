import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const localUri = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/ai-career-assistant';

  try {
    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
    
    if (error.message.includes('ENOTFOUND') || error.name === 'MongooseServerSelectionError') {
      console.log('Attempting to connect to local MongoDB fallback...');
      try {
        const conn = await mongoose.connect(localUri);
        console.log(`Connected to Local MongoDB: ${conn.connection.host}`);
      } catch (localError) {
        console.error(`Local MongoDB connection failed: ${localError.message}`);
        console.error('Please ensure either MongoDB Atlas is reachable or a local MongoDB instance is running.');
      }
    }
  }
};

connectDB();
