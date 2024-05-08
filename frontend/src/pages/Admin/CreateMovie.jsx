import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation, useUploadImageMutation } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import "./createMovie.css"; 
import { Link } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [yearError, setYearError] = useState("");

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
      console.log(genres[0]?._id);
    }
  }, [genres]);

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

  const handleCreateMovie = async () => {
    try {
      console.log("Movie data:", movieData);
      console.log("Selected image:", selectedImage);

      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      if (yearError) {
        toast.error("Please enter a valid year");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);
        console.log("Uploaded image path 1: ", uploadedImagePath);
        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
          console.log("Uploaded image path 2: ", uploadedImagePath);
        }

        await createMovie({
          ...movieData,
          year: parseInt(movieData.year, 10), 
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: "",
          detail: "",
          cast: [],
          rating: 0,
          image: null,
          genre: "horror",
        });

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="container mt-4 create-movie-container" style={{ maxWidth: "600px" }}>
       <div>
    <Link to="/admin/movies/dashboard" className=" font-weight-bold text-decoration-none ml-5"
    style={{backgroundColor:'#40826D',color:'#ffffff', padding:'2%', borderRadius:'5px', marginLeft:'0rem'}}>
      Go Back
    </Link>
  </div>

      <form>
        <h2 className="card-title text-center mb-4">Create Movie</h2>

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
            onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="form-select"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={!selectedImage ? { border: "1px solid #888", borderRadius: "5px", padding: "8px" } : { border: "0", borderRadius: "0", padding: "0" }}
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
          onClick={handleCreateMovie}
          className="create-movie-button"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
