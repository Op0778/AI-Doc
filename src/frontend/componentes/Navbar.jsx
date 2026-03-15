import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">MySite</div>

      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <Link to="/home">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
      </ul>

      <Link to="/admin/dashboard" className="admin-link">
        <button>Admin Dashboard</button>
      </Link>
    </nav>
  );
}

export default Navbar;
