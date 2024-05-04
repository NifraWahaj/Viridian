 /// WHOLE CODE CHANGED FOR CREATE MOVIE 
//It seems like the issue might be related to how you are constructing the request in your query function
//Use fetch to make the HTTP request to the endpoint.
//Ensure to set the correct Content-Type header to application/json.
//Convert the newMovie object to a JSON string using JSON.stringify() before sending it in the request body.
//Handle errors appropriately by checking the response status and throwing an error if the request fails.
//Parse the response body using response.json() to get the data returned by the server.'
import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),

    createMovie: builder.mutation({
      query: async (newMovie) => {
        try {
          console.log("inside MovieROUTES");
          
          const response = await fetch(`${MOVIE_URL}/create-movie`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json" // Make sure to set the correct Content-Type
              },
              body: JSON.stringify(newMovie) // Convert the newMovie object to JSON string
          });

          if (!response.ok) {
              throw new Error(`Failed to create movie: ${response.statusText}`);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error:", error);
          throw error; // Rethrow the error to handle it in the calling code
        }
      }
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",   /// sends data to api/v1/upload
        body: formData,
      }),
    }),

    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
    }),

    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
  useDeleteMovieMutation,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = moviesApiSlice;
