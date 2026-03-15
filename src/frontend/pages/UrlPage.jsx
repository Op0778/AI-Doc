import React, { useState } from "react";
import { generateDoc } from "../services/api";
import "../styles/UrlPage.css";

function UrlPage({ setDoc, setLoading }) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  // Paste URL
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setMessage("URL pasted successfully ✅");
    } catch (err) {
      console.log(err);
      setMessage("Clipboard access denied ❌");
    }
  };

  // Clear input
  const handleClear = () => {
    setUrl("");
    setMessage("");
  };

  // Validate URL
  const handleSubmit = () => {
    if (!url) {
      setMessage("Please enter a URL");
      return;
    }

    try {
      new URL(url);
      setMessage("Valid URL ✅");
    } catch {
      setMessage("Invalid URL ❌");
    }
  };

  // Generate documentation
  const handleGenerateDoc = async (e) => {
    e.preventDefault();

    if (!url) {
      setMessage("Please enter a repository URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setMessage("Invalid URL ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await generateDoc(url);

      if (res?.data?.generatedDoc) {
        setDoc(res.data.generatedDoc);
        setMessage("Documentation generated successfully 🎉");
      } else {
        setMessage("Failed to generate documentation");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error while generating documentation ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Enter or Paste Repository URL</h2>

      <input
        type="text"
        placeholder="Paste GitHub repo URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input"
      />

      <div className="buttonRow">
        <button onClick={handleClear} className="clearButton">
          Clear
        </button>

        <button onClick={handlePaste} className="button">
          Paste URL
        </button>

        <button onClick={handleSubmit} className="button">
          Check URL
        </button>

        <button onClick={handleGenerateDoc} className="button">
          Generate Documentation
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UrlPage;
