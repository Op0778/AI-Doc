import { useState } from "react";
import Login from "./frontend/auth/Login";
import Register from "./frontend/auth/Register";
import Navbar from "./frontend/componentes/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./frontend/pages/Home";
import { Navigate } from "react-router-dom";
import History from "./frontend/pages/History";
import AdminRoute from "./frontend/pages/admin/AdminRoute";
import Dashboard from "./frontend/pages/admin/Dashboard";
import UserList from "./frontend/pages/admin/UserList";
import UserUpdate from "./frontend/pages/admin/UserUpdate";
import AdminHistory from "./frontend/pages/admin/History";
import UrlPage from "./frontend/pages/UrlPage";

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
        <Route path="/home" element={<Home />} />
        {/* <Navbar /> */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            token ? <Home onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/url" element={<UrlPage />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="user/update/:id" element={<UserUpdate />} />
          <Route path="history" element={<AdminHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
