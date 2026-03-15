import axios from "axios";

export const generateDoc = (url) => {
  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:5000/api/doc/generate",
    { repoUrl: url },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
