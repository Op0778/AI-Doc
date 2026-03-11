import axios from "axios";

export const generateDoc = async (repoUrl) => {
  return axios.post("http://localhost:5000/api/doc/generate", {
    repoUrl,
  });
};
