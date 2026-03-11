import axios from "axios";

export const fetchRepoFiles = async (repoUrl) => {
  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repo = parts[1];

    let allCode = "";

    const fetchContents = async (path = "") => {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await axios.get(apiUrl);

      for (const item of response.data) {
        if (item.type === "dir") {
          // 🔁 Recursive call for folder
          await fetchContents(item.path);
        }

        if (
          item.type === "file" &&
          (item.name.endsWith(".html") ||
            item.name.endsWith(".jsx") ||
            item.name.endsWith(".ts") ||
            item.name.endsWith(".tsx") ||
            item.name.endsWith(".css") ||
            item.name.endsWith(".js") ||
            item.name.endsWith(".json"))
        ) {
          const fileData = await axios.get(item.download_url);

          allCode += `\n\n// File: ${item.path}\n`;

          if (typeof fileData.data === "object") {
            // JSON file formatting
            allCode += JSON.stringify(fileData.data, null, 2);
          } else {
            allCode += fileData.data;
          }
        }
      }
    };

    await fetchContents("");

    return allCode;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Failed to fetch full repository");
  }
};
