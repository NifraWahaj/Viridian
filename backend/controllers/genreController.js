import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new Genre({ name }).save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Check if any movies exist with this genre before deleting the genre
    const moviesWithGenre = await Movie.find({ genre: id });
    console.log("moviesWithGenre "+ moviesWithGenre.name);

    if (moviesWithGenre.length > 0) {
      console.log("moviesWithGenre "+ moviesWithGenre.length);
      return res.status(400).json({ message: "Cannot delete genre. Movies with this genre exist." });
    }

    // If no movies exist with this genre, proceed with deleting the genre
    const removed = await Genre.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.json(removed);
  } catch (error) {
    console.error(error);
    //res.status(500).json({ error: "Internal server error" });
  }
});

   

const listGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
