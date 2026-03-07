import React, { useEffect, useState } from "react";
import "../styles/History.css";
import connectionUrl from "../pages/url";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${connectionUrl}/api/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Documentation History</h1>
      </div>

      <div className="history-list">
        {historyData.length === 0 ? (
          <p>No history found.</p>
        ) : (
          historyData.map((item) => (
            <div className="history-card" key={item._id}>
              <div className="history-left">
                <h2>{item.project}</h2>
                <p className="repo-link">{item.repo}</p>

                <div className="tech-tags">
                  {item.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="history-right">
                <p className="date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <button className="btn pdf-btn">Download PDF</button>
                <button className="btn md-btn">Download MD</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
