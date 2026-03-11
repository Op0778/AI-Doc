import axios from "axios";

async function generateDocumentationFromCode(repoUrl) {
  // 1️⃣ Fetch the repo content via GitHub API
  const repoPath = repoUrl.replace("https://github.com/", "");
  const [owner, repo] = repoPath.split("/");

  const filesRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contents`,
  );

  const files = filesRes.data.map((file) => file.name).join(", ");

  // 2️⃣ Use AI API to generate documentation
  // Example using OpenAI API (pseudo code)
  /*
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Generate documentation for the following files in a repo: ${files}`
      }
    ]
  });
  return completion.choices[0].message.content;
  */

  // For demo, just return filenames
  return `Repo contains these files: ${files}\n\n[AI documentation can be inserted here]`;
}

// module.exports = { generateDocumentationFromCode };
export { generateDocumentationFromCode };
