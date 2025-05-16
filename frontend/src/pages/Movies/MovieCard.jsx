import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const backendImageUrl = `http://localhost:3000/${movie.image}`;

  return (
    <div
      className="custom-card-spacing"
      style={{
        flex: "0 0 250px",
        margin: "10px",
      }}
    >
      <div
        className="card h-100"
        style={{
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          to={`/movies/${movie._id}`}
          className="text-decoration-none"
          style={{ height: "100%", textAlign: "center" }}
        >
          <img
            src={backendImageUrl}
            alt={movie.name}
            className="card-img-top rounded"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <div
            className="card-body"
            style={{
              padding: "10px",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h5
              className="card-title text-dark"
              style={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                fontSize: "1.1rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {movie.name}
            </h5>
            <p
              className="card-text text-dark"
              style={{
                fontSize: "0.9rem",
                color: "#333",
              }}
            >
              {movie.year}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
