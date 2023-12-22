import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    console.log("Mongo db url is not found");
  }
  if (isConnected) console.log("Already connected to mongodb");

  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
