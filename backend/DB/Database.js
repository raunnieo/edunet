import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  // Set your credentials and database name
  const username = "raunnieo";
  const password = encodeURIComponent("-W*dyW4a6F59XuV"); // encode if special characters
  const dbName = "raunak"; // Optional: specify your database name

  // Updated connection string
  const url = `mongodb+srv://${username}:${password}@raunak.01h01.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=raunak`;

  const { connection } = await mongoose.connect(url);

  console.log(`MongoDB Connection successful to ${connection.host}`);
};
