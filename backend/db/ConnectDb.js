import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected at: ${conn.connection.host}`);
    } catch (err) {
        console.error("Failed to connect to DB:", err);
        console.log("Mongo URI:", process.env.MONGO_URI);
        process.exit(1);
    }
};
