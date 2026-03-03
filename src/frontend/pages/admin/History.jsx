import React, { useEffect, useState } from "react";
import axios from "axios";
import connectionUrl from "../url";
import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
import "../../styles/admin/histories.css";

function History() {
  const [histories, setHistories] = useState([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    const fetchhistories = async () => {
      try {
        const res = await axios.get(`${connectionUrl}/api/admin/history`);
        console.log("History : ", res.data);
        setHistories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistories([]);
      }
    };
    fetchhistories();
  }, []);
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="historyList">
        <h1>HISTORY</h1>
        <table>
          <thead>
            <tr>
              <th>History Id</th>
              <th>History Project</th>
              <th>History Tech</th>
            </tr>
          </thead>

          <tbody>
            {histories.length > 0 ? (
              histories.map((history) => (
                <tr key={history._id}>
                  <td>{history._id}</td>
                  <td>{history.project}</td>
                  <td>{history.tech}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  product not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default React.memo(History);
