import mongoose from "mongoose";

// making connection to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server connected to MongoDB database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to the database:`, error);
  }
};

export default connectDB;
