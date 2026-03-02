import { useState } from "react";
import Login from "./frontend/auth/Login";
import Register from "./frontend/auth/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./frontend/pages/Home";
import { Navigate } from "react-router-dom";
import History from "./frontend/pages/History";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (t, id, role) => {
    setToken(t);
    localStorage.setItem("token", t);
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            token ? <Home onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
