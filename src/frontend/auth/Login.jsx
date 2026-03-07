import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import connectionUrl from "../pages/url";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${connectionUrl}/api/auth/login`, form);

      const { token, user } = res.data;

      // Safety check
      if (!token || !user) {
        alert("Invalid server response");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);

      // If you later add role in backend, you can store it here
      localStorage.setItem("role", user.role);

      if (onLogin) {
        onLogin(token, user._id, user.role);
      }

      console.log("Login Success:", token, user._id, "role:", user.role);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <div className="relink">
            I don't Have an Account? <Link to="/register">Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
