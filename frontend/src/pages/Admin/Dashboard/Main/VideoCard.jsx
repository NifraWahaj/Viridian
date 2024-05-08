import React from "react";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="custom-card-spacing">
      <div className="card" style={{ display: "flex", marginBottom: "30px" }}>
        <img src={image} alt="Card Image" style={{ width: "200px", height: "150px", objectFit: "cover" }} />
        <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "15px" }}>
          <h5 className="card-title font-weight-bolder text-dark" style={{ marginBottom: "10px" }}>{title}</h5>
          <p className="card-text text-dark" style={{ marginBottom: "10px" }}>{date}</p>
          <div className="text-dark text-lg">{comments}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
