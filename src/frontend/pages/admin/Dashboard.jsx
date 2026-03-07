import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import "../../styles/admin/dashboard.css";
import connectionUrl from "../url";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Token in Dashboard:", token);
  const role = localStorage.getItem("role");
  console.log("Role in Dashboard:", role);

  const countContent = [
    {
      name: "Total Users",
      count: users.length,
      path: "/admin/users",
      type: "user",
    },
    {
      name: "Total histories",
      count: histories.length,
      path: "/admin/history",
      // type: "product",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${connectionUrl}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Users :", res.data);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    };

    const fetchhistories = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${connectionUrl}/api/admin/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("histories :", res.data);
        setHistories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching histories:", err);
        setHistories([]);
      }
    };

    fetchUsers();
    fetchhistories();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">DASHBOARD</h1>

        <div className="dashboard-data">
          {countContent.map((item, index) => (
            <div
              className={`dashboard-card ${item.type}`}
              key={index}
              onClick={() => navigate(item.path)}
            >
              <h3>{item.name}</h3>
              <p>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
