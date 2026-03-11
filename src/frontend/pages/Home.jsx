import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import UrlPage from "./UrlPage";
import DocPage from "./DocPage";
import Loader from "./Loader";
import "../styles/Home.css";

const Home = () => {
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="home">
      <Navbar />
      <UrlPage setDoc={setDoc} setLoading={setLoading} />
      {loading && <Loader />}
      {doc && <DocPage doc={doc} />}
      <Footer />
    </div>
  );
};

export default Home;
