import React, { useState } from "react";

function UrlInputBox() {
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

  return (
    <div style={styles.container}>
      <h2>Enter or Paste URL</h2>

      <input
        type="text"
        placeholder="Type or paste your URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <div style={styles.buttonRow}>
        <button onClick={handlePaste} style={styles.button}>
          Paste URL
        </button>

        <button onClick={handleSubmit} style={styles.button}>
          Check URL
        </button>

        <button onClick={handleClear} style={styles.clearButton}>
          Clear
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial"
  },

  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "10px"
  },

  buttonRow: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  button: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  },

  clearButton: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer"
  },

  message: {
    marginTop: "10px",
    fontWeight: "bold"
  }
};

export default UrlInputBox;