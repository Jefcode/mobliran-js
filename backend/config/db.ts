import mongoose, { MongooseError } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as MongooseError).message}`);
    process.exit(1);
  }
};

export default connectDB;
