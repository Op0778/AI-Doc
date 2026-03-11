import { useState } from "react";
import Navbar from "../componentes/Navbar";
import UrlPage from "../pages/UrlPage";
import DocPage from "../pages/DocPage";
import Loader from "../pages/Loader";
import "../styles/Home.css";
export default function Home() {
  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="home">
      <Navbar />
      <UrlPage setDoc={setDoc} setLoading={setLoading} />
      {loading && <Loader />}
      {doc && <DocPage doc={doc} />}
    </div>
  );
}
