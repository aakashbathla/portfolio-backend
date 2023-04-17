import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss";
import { AuthContext } from "../../utilities/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    e.persist();
    setInputs((prev) => {
      console.log(e.target); // Check the value of e.target
      console.log(e.target.name); // Check the value of e.target.name
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          {err && <p>{err}</p>}
          <span className="register">
            Don't you have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <div className="auth-right"></div>
    </div>
  );
};

export default Login;
