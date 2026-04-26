import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    if (error.message.includes('ENOTFOUND') || error.name === 'MongooseServerSelectionError') {
      console.log('Attempting local fallback...');
      try {
        await mongoose.connect(process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/ai-career-assistant');
        console.log('Connected to Local MongoDB');
      } catch (localErr) {
        console.error('All connection attempts failed.');
      }
    }
  }
};

export default connectDB;
