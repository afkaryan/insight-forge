import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
dotenv.config();

const listUsers = async () => {
    const uri = process.env.MONGO_URI;
    const localUri = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/ai-career-assistant';

    try {
        console.log('Testing connection logic...');
        // Try same logic as in db.js
        let connected = false;
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log('Connected to Atlas');
            connected = true;
        } catch (e) {
            console.log('Atlas failed, trying local...');
            await mongoose.connect(localUri);
            console.log('Connected to Local');
            connected = true;
        }

        if (connected) {
            const users = await User.find({});
            console.log(`Found ${users.length} users:`);
            users.forEach(u => console.log(`- ID: ${u._id}, Email: ${u.email}`));
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listUsers();
