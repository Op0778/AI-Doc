export const generateDocumentation = async (files) => {
  try {
    let techStack = [];
    let components = [];
    let dependencies = [];

    // Detect tech stack
    if (files.includes(".html")) techStack.push("HTML");
    if (files.includes(".css")) techStack.push("CSS");
    if (files.includes(".js")) techStack.push("JavaScript");
    if (files.includes(".jsx")) techStack.push("React");
    if (files.includes("vite")) techStack.push("Vite");
    if (files.includes("express")) techStack.push("Express");
    if (files.includes("mongoose")) techStack.push("MongoDB");

    // Extract components
    const componentMatches = files.match(/\/\/ File: (.*\.jsx)/g);
    if (componentMatches) {
      components = componentMatches.map((c) => c.replace("// File: ", ""));
    }

    // Extract dependencies from package.json
    const packageMatch = files.match(/"dependencies":\s*{([\s\S]*?)}/);
    if (packageMatch) {
      const deps = packageMatch[1].split(",");
      dependencies = deps.map((d) => d.split(":")[0].replace(/["\s]/g, ""));
    }

    return `
 Project Documentation

1. Overview
This project is a web application built using modern JavaScript technologies.

2. Tech Stack
${techStack.map((t) => `- ${t}`).join("\n")}

3. Dependencies
${dependencies.map((d) => `- ${d}`).join("\n")}

4.  Tree Structure
${files
  .split("\n")
  .map((f) => `- ${f}`)
  .join("\n")}

5. DataBase structure
${files.includes("mongoose") ? "- MongoDB" : "No database detected"}

6.  Flowchart

7. Components
${components.map((c) => `- ${c}`).join("\n")}

8. Project Code
${files}



9.  How to Run
1. npm install
2. npm run dev

10. Conclusion
This documentation provides an overview of the project structure, tech stack, dependencies, and components. It serves as a guide for developers to understand and contribute to the project effectively.

---
Generated automatically without external AI.
`;
  } catch (error) {
    console.error(error);
    throw new Error("Documentation generation failed");
  }
};
