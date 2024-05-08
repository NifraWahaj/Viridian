import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <>
      <Link
        to="/admin/movies/dashboard"
        className="font-weight-bold text-decoration-none ml-5"
        style={{
          backgroundColor: '#40826D',
          color: '#ffffff',
          padding: '1%',
          borderRadius: '5px',
          marginLeft: '5rem',
          marginTop: '3rem'
        }}
      >
        Go Back
      </Link>
      <div className="container mx-5">
        <div className="row">
          <div className="col-md-12">
            <div className="ml-2 text-xl font-weight-bold mt-4 mb-3">
              All Movies ({movies?.length})
            </div>

            <div className="row justify-content-around align-items-center p-3">
              {movies?.map((movie) => {
                let backendImageUrl = `http://localhost:3000/${movie.image}`;
                return (
                  <div key={movie._id} className="col-md-4 mb-4 overflow-hidden">
                    <div className="card shadow">
                      <img
                        src={backendImageUrl}
                        alt={movie.name}
                        className="card-img-top"
                        style={{ height: "15rem"}}
                      />
                      <div className="card-body">
                        <h5 className="card-title font-weight-bold">{movie.name}</h5>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`/admin/movies/update/${movie._id}`}
                          className="btn btn-block"
                          style={{ backgroundColor:'#40826D', color:'#e2e2e2', borderRadius:'5px'}}
                        >
                          Update Movie
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMoviesList;
