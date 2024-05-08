import { Link } from "react-router-dom";
import "./sidebar.css"; // Import CSS file for custom styling
//DONE
const Sidebar = () => {
  return (

<div className="container d-flex justify-content-center mt-10"
style={{marginLeft:'20rem'}}>
  <nav className="d-flex w-100 w-md-25 flex-shrink-0">
    <ul className="list-unstyled d-flex flex-row">
      <li className="text-lg me-3"
      style={{marginLeft:'2rem', paddingRight:'1rem', width:'10rem'}}
      
      >
        <Link to="/admin/movies/create" className="btn sidebar-btn" style={{ backgroundColor:'#40826D', color:'#e2e2e2', borderRadius:'5px'}}>
          Create Movie
        </Link>
      </li>
      <li className="text-lg me-3"
      style={{marginLeft:'2rem', paddingRight:'1rem', width:'10rem'}}>
        <Link to="/admin/movies/genre" className="btn sidebar-btn" style={{ backgroundColor:'#40826D', color:'#e2e2e2', borderRadius:'5px'}}>
          Manage Genre
        </Link>
      </li>
      <li className="text-lg me-3"
      style={{marginLeft:'2rem', paddingRight:'1rem', width:'10rem'}}>
        <Link to="/admin/movies-list" className="btn sidebar-btn" style={{ backgroundColor:'#40826D', color:'#e2e2e2', borderRadius:'5px'}}>
          Manage Movie
        </Link>
      </li>
      <li className="text-lg"
      style={{marginLeft:'2rem', paddingRight:'1rem', width:'10rem'}}>
        <Link to="/admin/movies/comments" className="btn sidebar-btn" style={{ backgroundColor:'#40826D', color:'#e2e2e2', borderRadius:'5px'}}>
          Review
        </Link>
      </li>
    </ul>
    
  </nav>

</div>


  );
};

export default Sidebar;
