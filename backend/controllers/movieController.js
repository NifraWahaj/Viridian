import Movie from "../models/Movie.js";
 import express from 'express';
import bodyParser from 'body-parser';

 
 

const createMovie = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  

    const newMovie = new Movie(req.body);
    console.log("Movie Object:", newMovie);  
    const savedMovie = await newMovie.save();
    console.log("Saved Movie:", savedMovie);  
    res.json(savedMovie);
    console.log("Response sent successfully"); 
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ error: "Internal Server Error" }); 
  }
};


const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(specificMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const changeGenreOfMovies = async (req, res) => {
  try {
    const { oldGenre, newGenre } = req.body;

    // Find all movies with the old genre
    const moviesToUpdate = await Movie.find({ genre: oldGenre });

    // Check if any movies with the old genre were found
    if (moviesToUpdate.length === 0) {
      return res.status(404).json({ message: `No movies found with genre ${oldGenre}` });
    }

    // Update the genre of each movie to the new one
    for (const movie of moviesToUpdate) {
      movie.genre = newGenre;
      await movie.save();
    }

    res.json({ message: `Genre updated successfully for ${moviesToUpdate.length} movies` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
  changeGenreOfMovies,

};