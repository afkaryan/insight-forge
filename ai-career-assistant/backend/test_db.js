import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        console.log('URI:', process.env.MONGO_URI.split('@')[1]); // Log only the host part for safety
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

testDB();
