import React from "react";
//DONE
const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="d-flex align-items-center w-90 mt-5">
      <div>
        <img src={image} alt="Card Image" className="h-3rem" />
      </div>

      <div className="ms-4">
        <h2 className="text-lg text-dark">{title}</h2>
        <p className="text-gray-500 mb-3">{date}</p>
      </div>

      <div className="flex-grow-1 mb-5 d-flex justify-content-end align-items-center">
        <div className="text-dark text-lg">{comments}</div>
      </div>
    </div>
  );
};

export default VideoCard;
