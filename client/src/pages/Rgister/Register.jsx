import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/auth/register`,
        inputs
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/posts`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="login-header">
          <h1>Register</h1>
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
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
          <button type="submit">Register</button>
          {err && <p>{err}</p>}
          <span className="register">
            Do you have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <div className="auth-right"></div>
    </div>
  );
};

export default Register;
