import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

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

    if (name === "genre") {
    //  const selectedGenre = genres.find((genre) => genre.name === value);
      const selectedGenre = genres.find((genre) => genre._id === value); // Use _id for comparison
      const genreId = selectedGenre ? selectedGenre._id : ""; // Check if selectedGenre exists
      console.log("genre value "+value);
      
      setMovieData((prevData) => ({
        ...prevData,
        genre: genreId,
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

    
        
  const handleCreateMovie = async () => {
    try {
      console.log("Movie data:", movieData);
      console.log("Selected image:", selectedImage);
      console.log("Movie data:", movieData);
      console.log("Selected image:", selectedImage);
  
      // Add this line to check the value of selectedImage
      console.log("Is selectedImage null?", !selectedImage);
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast || !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }
  
      let uploadedImagePath = null;
  
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
  
        const uploadImageResponse = await uploadImage(formData); // goes to redux/api/movie
        console.log("Uploaded image path 1: ", uploadedImagePath); // Add this line
        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
          console.log("Uploaded image path 2: ", uploadedImagePath); // Add this line
        }
  
        await createMovie({
          ...movieData,
          image: uploadedImagePath, // Uncomment this line
        });
  
        navigate("/admin/movies-list");
  
        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
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
    <div className="container flex justify-center items-center mt-4">
    <form>
      <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
      <div className="mb-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Year:
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Detail:
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          ></textarea>
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Cast (comma-separated):
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="border px-2 py-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Genre:
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
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
        </label>
      </div>
  
      <div className="mb-4">
        <label
          style={
            !selectedImage
              ? {
                  border: "1px solid #888",
                  borderRadius: "5px",
                  padding: "8px",
                }
              : {
                  border: "0",
                  borderRadius: "0",
                  padding: "0",
                }
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
        onClick={handleCreateMovie}
        className="bg-teal-500 text-white px-4 py-2 rounded"
        disabled={isCreatingMovie || isUploadingImage}
      >
        {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
      </button>
    </form>
  </div>
  
  );
};
export default CreateMovie;
