import React from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import UrlPage from "./UrlPage";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <UrlPage />
      <Footer />
    </div>
  );
};

export default Home;
