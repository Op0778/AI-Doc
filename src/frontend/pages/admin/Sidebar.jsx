import React, { useState } from "react";
import "../../styles/admin/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { MdDashboard, MdLogout, MdMenu } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
    { name: "Users", path: "/admin/users", icon: <FaUser /> },
    { name: "History", path: "/admin/history", icon: <FaShoppingBag /> },
    { name: "Logout", path: "/home", icon: <MdLogout /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="mobile-menu" onClick={() => setOpen(!open)}>
        <MdMenu size={24} />
      </div>

      <div className={`sidebar ${open ? "active" : ""}`}>
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? "active-item" : ""
            }`}
            onClick={() => {
              navigate(item.path);
              setOpen(false);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(Sidebar);
