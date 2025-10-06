import mongoose from "mongoose";

let isConnected;

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("DB connection failed");
  }
};

export default connectDB;
