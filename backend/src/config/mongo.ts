import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if(!uri) throw new Error("MongoDB URI is not defined in environment variables.");

    try{
        await mongoose.connect(uri);
        console.log("[*] MongoDB connected successfully.");
    }catch(err: any){
        console.error("Error connecting to MongoDB:", err?.message);
        process.exit(1);
    }
}

export default connectDB;