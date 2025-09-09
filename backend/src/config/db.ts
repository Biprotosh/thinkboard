import mongoose from "mongoose";
import { env_config } from "./env";

export const connectDB = async () => {
    try {
        mongoose.connect(env_config.MONGO_URI);
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}