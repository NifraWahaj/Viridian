import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-5">
      <div className="row">
        <div className="col-md-12">
          <div className="ml-2 text-xl font-weight-bold mt-4 mb-3">
            All Movies ({movies?.length})
          </div>

          <div className="row justify-content-around align-items-center p-3">
            {movies?.map((movie) => (
              <div key={movie._id} className="col-md-4 mb-4 overflow-hidden">
                <div className="card shadow">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="card-img-top"
                    style={{ height: "15rem", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">{movie.name}</h5>
                    <p className="card-text">{movie.detail}</p>
                  </div>
                  <div className="card-footer">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="btn btn-primary btn-block"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
