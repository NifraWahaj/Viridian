import { Link } from "react-router-dom";
import "./sidebar.css"; // Import CSS file for custom styling
//DONE
const Sidebar = () => {
  return (
    <div className="flex h-screen fixed mt-10 border-r-2 border-[#242424]">
      <aside className="text-white w-64 flex-shrink-0">
        <ul className="list-unstyled">
          <li className="text-lg mb-3">
            <Link
              to="/admin/movies/dashboard"
              className="btn btn-dark btn-block sidebar-btn"
            >
              Dashboard
            </Link>
          </li>
          <li className="text-lg mb-3">
            <Link
              to="/admin/movies/create"
              className="btn btn-dark btn-block sidebar-btn"
            >
              Create Movie
            </Link>
          </li>
          <li className="text-lg mb-3">
            <Link
              to="/admin/movies/genre"
              className="btn btn-dark btn-block sidebar-btn"
            >
              Create Genre
            </Link>
          </li>
          <li className="text-lg mb-3">
            <Link
              to="/admin/movies-list"
              className="btn btn-dark btn-block sidebar-btn"
            >
              Update Movie
            </Link>
          </li>
          <li className="text-lg mb-3">
            <Link
              to="/admin/movies/comments"
              className="btn btn-dark btn-block sidebar-btn"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
