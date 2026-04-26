import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testDirectConnection = async () => {
    // Construct direct URI from SRV lookup results
    const nodes = [
        'ac-icbu60b-shard-00-00.m9qdi9x.mongodb.net:27017',
        'ac-icbu60b-shard-00-01.m9qdi9x.mongodb.net:27017',
        'ac-icbu60b-shard-00-02.m9qdi9x.mongodb.net:27017'
    ];
    // We'll try to guess the replicaSet or connect without it first to see if it reports the correct one
    const uri = `mongodb://bishtaryan41_db_user:UoFITG5iIKGR7DFO@${nodes.join(',')}/ai-career-assistant?ssl=true&authSource=admin`;

    try {
        console.log('Connecting to Atlas directly (no SRV)...');
        const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`Connected! Host: ${conn.connection.host}`);
        
        // Check replica set name
        const admin = conn.connection.db.admin();
        const info = await admin.command({ isMaster: 1 });
        console.log('Replica Set:', info.setName);
        
        process.exit(0);
    } catch (error) {
        console.error('Connection failed:', error.message);
        process.exit(1);
    }
};

testDirectConnection();
