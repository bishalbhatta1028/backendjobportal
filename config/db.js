import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_LOCAL_URL)
      .then(() => console.log("Database Connected!"));
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
