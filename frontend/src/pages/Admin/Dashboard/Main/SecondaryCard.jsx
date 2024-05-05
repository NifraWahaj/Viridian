//DONE
import React from "react";

const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div className="card w-100" style={{ maxWidth: "15rem", minWidth: "13rem", height: "10rem", marginTop: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", marginLeft: "20px", color: "black", background: gradient }}>
      <div className="card-header border-0 bg-transparent text-center py-2">
        {pill}
      </div>

      <div className="card-body d-flex align-items-center justify-content-center">
        <h2 className="text-center font-weight-bold">{content}</h2>
      </div>

      <div className="card-footer bg-transparent text-center">
        {info}
      </div>
    </div>
  );
};

export default SecondaryCard;
