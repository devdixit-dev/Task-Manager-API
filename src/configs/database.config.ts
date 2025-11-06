import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(`${process.env.DB_URL}`, { dbName: process.env.DB_NAME })
  .then(() => { console.log(`Database connected`) })
  .catch((e) => { console.log(`Error in database connection - ${e}`) });
}

export default connectDB;