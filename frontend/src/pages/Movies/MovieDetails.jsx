import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import './MovieDetail.css'
const MovieDetails = () => {

  
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);

  const { userInfo } = useSelector((state) => state.auth);
  
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <>
    <div class="container">
      <div class="row"  style={{ height: "10rem"}}>
        <div class="col-md-6">
                <div className="d-flex justify-content-center align-items-center">
                {movie && (
                  <img
                    src={`http://localhost:3000/${movie.image}`}
                    alt={movie?.name}
                    className="rounded"
                    style={{ width:'55%', marginTop:'4rem'}}
                  />
                )}
              </div>
        </div>
        <div class="col-md-6">
                <div className="container-fluid d-flex justify-content-between ml-5 mt-3"
                 
                >
                  <section>
                    <h2 className="text-5xl my-4"  
                      style={{ fontWeight: "bolder"}}>{movie?.name}
                    </h2>
                    <h6 className="text-2xl" style={{ fontWeight: "bold"}} >
                       {movie?.year}
                    </h6>
                    <p className="my-4 text-" style={{ color:'#2f2f2f' }}>
                      {movie?.detail}
                    </p>
                  
                    <div>
                      <p className="my-4 text-" style={{ color: '#2f2f2f', fontWeight: "bold" }}>
                        Cast:
                      </p>
                      <ul className="list-unstyled">
  {movie?.cast.map((c) => (
    <li key={c._id} className="mt-3">
      <div className="circle"></div> {/* Circle marker */}
      {c}
    </li>
  ))}
</ul>

                  </div>



                   


                    
                  </section>

          

                </div>
        </div>

            
        
      </div>
    
    
    </div>
    <div class='container'>

    <div class='row ' style={{ height: "10rem", marginTop:'20rem'}}>

<div className="container ml-5">
  <MovieTabs
    loadingMovieReview={loadingMovieReview}
    userInfo={userInfo}
    submitHandler={submitHandler}
    rating={rating}
    setRating={setRating}
    comment={comment}
    setComment={setComment}
    movie={movie}
  />
</div>

</div>


    </div>


 



  </>

  );
};

export default MovieDetails;

