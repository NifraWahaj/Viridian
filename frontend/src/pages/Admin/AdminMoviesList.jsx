import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import MovieCard from "../Movies/MovieCard"; // adjust the path as needed

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <>
    <div className="container mt-4">
  <Link
    to="/admin/movies/dashboard"
    className="btn font-weight-bold text-white"
    style={{
      backgroundColor: '#40826D',
      borderRadius: '5px',
      position:"relative",
      marginLeft:"0rem"
    }}
  >
    Go Back
  </Link>
</div>


      <div className="container mx-5">
        <div className="row">
          <div className="col-md-12">
            <div className="ml-2 text-xl font-weight-bold mt-4 mb-3">
              All Movies ({movies?.length})
            </div>

            <div className="row justify-content-around align-items-center p-3">
              {movies?.map((movie) => (
                <div key={movie._id} className="col-md-4 mb-4 overflow-hidden">
                  <MovieCard movie={movie} />

                  {/* Optional: Add Update Button Outside Card */}
                  <div className="mt-2 text-center">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="btn btn-sm"
                      style={{ backgroundColor:'#40826D', color:'#fff', borderRadius:'5px'}}
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMoviesList;
