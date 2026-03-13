import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
// import "../style/profileStyle.css";
import { useNavigate } from "react-router-dom";
import connectionUrl from "./url";

function Profile(s) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${connectionUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      
    </div>
  );
}

export default React.memo(Profile);