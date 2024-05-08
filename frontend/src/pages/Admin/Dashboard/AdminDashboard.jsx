import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="container-flex">
    <div className="row">
      <div className="col-lg-3">
        <Sidebar />
      </div>
      <div className="col-lg-9">
        <Main />
      </div>
    </div>
  </div>
  
  );
};

export default AdminDashboard;
