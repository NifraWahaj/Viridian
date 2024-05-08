import { useState } from "react";
import "./genreForm.css";  
const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="form-control py-3 px-4 border rounded-lg"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="d-flex justify-content-between">
          <button className="custom-btn ">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
