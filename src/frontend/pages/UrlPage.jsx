import React, { useState } from "react";
import { generateDoc } from "../services/api";
import "../styles/UrlPage.css";

function UrlPage({ setDoc, setLoading }) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setMessage("URL pasted successfully");
    } catch {
      setMessage("Clipboard access denied");
    }
  };

  // Clear input
  const handleClear = () => {
    setUrl("");
    setMessage("");
  };

  // Validate URL
  const handleSubmit = () => {
    try {
      new URL(url);
      setMessage("Valid URL ✅");
    } catch {
      setMessage("Invalid URL ❌");
    }
  };

  const handleGenerateDoc = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await generateDoc(url);
    setDoc(data.generatedDoc);

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Enter or Paste URL</h2>

      <input
        type="text"
        placeholder="Type or paste your URL here..."
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
