import { Link } from "react-router-dom";
import './MovieTabs.css'
const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <>
    <div class='row d-flex justify-content-center align-items-center'style={{ marginTop: "1rem", width:'100%'}}> 
    <div className="row">
              <div className="row justify-content-center" style={{ marginTop: "8rem" }}>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                  <div className="my-1">
                    <label htmlFor="comment" className="block text-xl mb-2"
                    style={{ fontWeight:"bold", marginLeft:'10rem'}}>
                      Write Your Review
                    </label>

                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-control p-2 border rounded-lg"
                      style={{ width: '65rem', marginLeft:'10rem' }}
                    ></textarea>
                  </div>
                  <br></br>

                  <button
                    type="submit"
                    className="btn py-2 px-4 rounded-lg submit-btn-review"
                    style={{  marginLeft:'10rem'}}
                  >
                    Submit
                  </button>
                </form>
                ) : (
                  <p class='review-p'>
                    Please <Link to="/login" className="login-link">Log In</Link> to write a review
                  </p>
                )}
              </div>

            
    </div>
    



  
   
  </div>
  <div className="myrow">
  <h2 className="text-2xl my-2 "  
                      style={{ fontWeight: "bolder", marginLeft:'10%'}}>Reviews:
                    </h2>
      <div className="d-flex justify-content-center align-items-center" style={{  }}>
        <div>
          {movie?.reviews.length === 0 && <p className='review-p2 '
          style={{  fontSize:'1.2rem'}}
          >No Reviews</p>}
        </div>
      </div>
     
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' , marginTop:'-12rem'}}>
   
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className=" p-4 rounded-lg review-container"
              style={{ width: '80%', marginTop: '-10rem' }}
            >
                  <div className="d-flex justify-content-between">
                    <strong className="text"  style={{ fontWeight:'bold', fontSize:'1.2rem' }}>{review.name}</strong>
                      
                      <p className="text" style={{ fontWeight:'bold' }}>
                        {review.createdAt.substring(0, 10)}
                      </p>
                  </div>
                  <hr  style={{ marginTop:'-0.8rem'}} ></hr>
    
              <p className="my-4">{review.comment}</p>
            </div>
          ))}
    </div>
  </div>

  </>
  
  );
};

export default MovieTabs;
