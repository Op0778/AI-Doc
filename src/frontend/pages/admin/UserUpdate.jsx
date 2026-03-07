import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import connectionUrl from "../url";
import "../../styles/admin/userUpdate.css";

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    role: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${connectionUrl}/api/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch user");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${connectionUrl}/api/admin/user/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("User Updated Successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      await axios.delete(`${connectionUrl}/api/admin/user/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("User Removed Successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Failed to remove user");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>User Update</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <button type="submit">Update</button>

          <button
            type="button"
            onClick={handleDeleteUser}
            className="delete-btn"
          >
            Remove
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(UserUpdate);
