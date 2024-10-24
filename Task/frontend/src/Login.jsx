import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log(response.data.data.token);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        // Redirect to the /task page on successful login
        navigate("/task");
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleRegisterRedirect}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
