import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => 
            console.log("Connected to MongoDB")
        );
    
        // Remove trailing slash if present and append database name
        const uri = process.env.MONGODB_URI.replace(/\/$/, '');
        await mongoose.connect(`${uri}/greencart`);
    } 
    catch (error) {
        console.log(error.message);
    }
};

export default connectDB;