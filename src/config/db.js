import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'nuevos'
        });
        console.log('MongoDB conectado...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
