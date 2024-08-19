import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Changed the way state is updated for simplicity and better performance
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Using the functional update form for setLoginInfo to avoid potential stale state issues
    setLoginInfo(prev => ({ ...prev, [name]: value })); // UPDATED
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Moved input validation before making the API call to avoid unnecessary requests
    if (!email || !password) {
      return handleError('Input fields are required!'); // UPDATED
    }

    // Added validation for password length before making the API call
    if (password.length < 4) {
      return handleError('Password must be at least 4 characters long.'); // UPDATED
    }

    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }

    } catch (err) {
      // Updated the error message for better user experience
      handleError('An unexpected error occurred. Please try again later.'); // UPDATED
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>

        <div>
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
