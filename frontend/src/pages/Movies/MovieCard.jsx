import { Link } from "react-router-dom";
import axios from "axios";
//DONE
const MovieCard = ({ movie }) => {
  // Define the backend image URL
  const backendImageUrl = `http://localhost:3000/${movie.image}`;

  return (
    <div className="custom-card-spacing"> {/* Use custom class */}
      <div className="card h-40">
        <Link to={`/movies/${movie._id}`} className="text-decoration-none">
          <img
            src={backendImageUrl}
            alt={movie.name}
            className="card-img-top rounded"
            style={{}}
          />
          <div className="card-body">
          <h5 className="card-title font-weight-bolder text-dark">{movie.name}</h5>
            <p className="card-text text-dark">{movie.year}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
