import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectToDatabase = async (dbName) => {
  const dbURI = `mongodb+srv://kushwahabibek9:VBYcWwXLl9fQbIpH@cluster0.bt94z.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  try {
    const  connection = await  mongoose.connect(dbURI);
    console.log(`Connected to database: ${dbURI}`);
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Error disconnecting from database:", error.message);
  }
};

export { connectToDatabase, disconnectDb };
