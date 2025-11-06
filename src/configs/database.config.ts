import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(`${process.env.DB_URL}`, { dbName: process.env.DB_NAME })
  .then(() => { console.log(`DATABASE: MongoDB Atlas Cluster0`) })
  .catch((e) => { console.log(`Error in database connection - ${e}`) });
}

export default connectDB;