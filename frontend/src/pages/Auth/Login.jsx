import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';  
import './login.css';  
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 main-cont">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Log In</h2>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block login-button"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </button>
                {loading && <Loader />}
              </form>
              <div className="mt-3 text-center">
              <div className="mt-3 text-center">
  <p>
    New User?{" "}
    <Link
      to={redirect ? `/register?redirect=${redirect}` : "/register"}
      className="login-link"
    >
      Register
    </Link>
  </p>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
