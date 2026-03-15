import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import connectionUrl from "./url";
import "../styles/Profile.css";

function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${connectionUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <FaUserCircle size={60} />
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
