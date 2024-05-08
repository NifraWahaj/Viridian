import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import "./UpdateMovie.css"; // Import CSS file
import Sidebar from "../Admin/Dashboard/Sidebar/Sidebar";
 

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [yearError, setYearError] = useState("");

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      const yearValue = parseInt(value, 10);
      if (yearValue < 1900 || yearValue > 2024 || isNaN(yearValue)) {
        setYearError("Year must be between 1900 and 2024.");
      } else {
        setYearError("");
      }
    }

    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (yearError) {
        toast.error("Please enter a valid year");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          year: parseInt(movieData.year, 10), // Ensure year is converted to number
          image: uploadedImagePath,
        },
      });

      navigate("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
   
    <div className="container mt-4 outer-container" style={{ maxWidth: "55rem" }}>
      <form>
        <h2 className="text-center mb-4">Update Movie</h2>

        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className={`form-control ${yearError ? "is-invalid" : ""}`}
          />
          {yearError && <div className="invalid-feedback">{yearError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label
            style={
              !selectedImage
                ? { border: "1px solid #888", borderRadius: "5px", padding: "8px" }
                : { border: "0", borderRadius: "0", padding: "0" }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleUpdateMovie}
          className="custom-btn"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
        </button>

        <button
          type="button"
          onClick={handleDeleteMovie}
          className="btn btn-danger ms-2"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
        </button>
      </form>
    </div>
   );
};

export default UpdateMovie;
