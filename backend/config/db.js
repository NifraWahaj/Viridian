import mongoose from "mongoose";
import Genre from "../models/Genre.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);

    // Check if "Other" genre already exists
    const existingGenre = await Genre.findOne({ name: 'Other' });

    if (!existingGenre) {
      // If "Other" genre doesn't exist, create it
      const otherGenre = new Genre({ name: 'Other' });
      await otherGenre.save();
      console.log('Genre "Other" added successfully.');
    } else {
      console.log('Genre "Other" already exists.');
    }
  } catch (error) {
    console.error(`Error: ${error.message}```);
    process.exit(1);
  }
};

export default connectDB;