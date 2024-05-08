import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
    <div>
    <Link to="/admin/movies/dashboard" className=" font-weight-bold text-decoration-none ml-5"
    style={{backgroundColor:'#40826D',color:'#ffffff', padding:'1%', borderRadius:'5px',
             marginLeft:'5rem', marginTop:'5rem'}}>
      Go Back
    </Link>
  </div>
      <h2 className="card-title text-center mb-4"  >All Reviews </h2>

    {movie?.map((m) => (
      <section key={m._id} className="d-flex flex-column justify-content-center align-items-center"
      
      >
      

        {m?.reviews.map((review) => (
          <div key={review._id} className="p-4 rounded-lg w-50 mt-2rem"
          style={{backgroundColor:'rgba(51, 139, 95, 0.26)', marginBottom:'2rem', color:'f2f2f2'}}>
            <div className="d-flex justify-content-between">
              <strong className="text"
                        style={{fontWeight:'bolder',color:'f2f2f2'}}>

                {review.name}</strong>
              <p className="text"
                  style={{fontWeight:'bold',color:'f2f2f2'}}>

                        {review.createdAt.substring(0, 10)}</p>
            </div>
  
            <p className="my-4"
                      style={{color:'f2f2f2'}}>

                      {review.comment}</p>
  
            <button className="text-danger" onClick={() => handleDeleteComment(m._id, review._id)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    ))}
  </div>
  
  );
};
export default AllComments;
