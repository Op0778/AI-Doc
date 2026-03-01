import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Login({ switchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      alert(res.data.message);

      // Store token
      localStorage.setItem("token", res.data.token);

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <span onClick={switchToRegister}>Register</span>
      </p>
    </div>
  );
}

export default Login;
