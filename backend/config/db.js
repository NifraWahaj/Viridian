import mongoose from "mongoose";
import Genre from "../models/Genre.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://smartCarpool_team:1izZO8RKbs2KVaLQ@cluster0.dc9ks.mongodb.net/viridian");
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
     process.exit(1);
  }
};

export default connectDB;