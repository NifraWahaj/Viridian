import React from "react";
import "./VideoCard.css";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="row mb-3 align-items-center" style={{ minHeight: "10rem", width: '100%' }}>
      <div className="col-md-8">
        <div className="card h-100" style={{ display: 'flex', flexDirection: 'row' }}>
          <img
            src={image}
            alt="Card Image"
            style={{ height: "100%", width: "40%", objectFit: "cover", borderRadius: '5px 0 0 5px' }}
          />
          <div className="card-body p-3" style={{ width: "60%", overflow: "hidden" }}>
            <h5
              className="card-title text-dark"
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h5>
            <p className="card-text text-dark" style={{ fontSize: '1.2rem' }}>{date}</p>
          </div>
        </div>
      </div>

      <div className="col-md-4 text-md-end text-center">
        <div
          className="text-dark"
          style={{ fontWeight: 'bold', fontSize: '1.4rem' }}
        >
          {comments} Reviews
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
