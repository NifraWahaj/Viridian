import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import "./App.css"; // Import CSS file for custom styling

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;