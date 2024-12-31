import mongoose from 'mongoose';

const connectToDatabase = async (dbName) => {
  const dbURI = `${process.env.URI}${dbName}`;
  try {
    const connection =  mongoose.connect(dbURI);
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
