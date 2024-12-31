let isDbConnected = false;
import mongoose from "mongoose";
const connectToDbOnce = async (DBNAME) => {
  if (!isDbConnected) {
    const dbName = `db_${DBNAME}`;
    const dbURI = `mongodb://localhost:27017/${dbName}`;
  
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000, // Increase timeout
      });
      isDbConnected = true;
      console.log(`Connected to database: ${dbName}`);
    } catch (error) {
      console.error("Error connecting to database:", error.message);
    }
  }
};
export default connectToDbOnce
