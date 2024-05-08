import React from "react";
import "./VideoCard.css";
const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div class="row"  style={{   height: "10rem", width: '100%'}}>
        <div class="col-sm-5"  style={{}}>
        <div className="custom-card-spacing">
          
          <div className="card" style={{   height: "10rem", width: '38rem'}}>

          <div class="row">
              <div class="col-sm-5">
              <img src={image} alt="Card Image" style={{ height: "100%",width: "45%"}} />
              </div>

              <div class="col-sm-7">
              <div className="card-body" style={{ height: "100%",width: "79%", }}>
                <h5 className="card-title font-weight-bolder text-dark" style={{ marginBottom: "10px" }}>{title}</h5>
                <p className="card-text text-dark" style={{ marginBottom: "10px" }}>{date}</p>
              </div>
              </div>

            </div>
            
          </div>


        </div>
        </div>
        <div class="col-sm-5">
        <div className="text-dark text-lg " style={{ marginLeft:'140%', marginTop: '25%'}}>{comments}</div>
        </div>

    </div>
  );
};






export default VideoCard;
