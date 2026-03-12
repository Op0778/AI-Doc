import { generateArchitectureDiagram } from "./diagramGenerator.js";

export const generateDocumentation = async (files) => {
  try {
    const fileList = files.split("\n");

    let techStack = [];
    let components = [];
    // let dependencies = [];
    let database = "No database detected";

    if (fileList.some((f) => f.endsWith(".html"))) techStack.push("HTML");
    if (fileList.some((f) => f.endsWith(".css"))) techStack.push("CSS");
    if (fileList.some((f) => f.endsWith(".js"))) techStack.push("JavaScript");
    if (fileList.some((f) => f.endsWith(".jsx"))) techStack.push("React");

    if (files.includes("express")) techStack.push("Express");

    if (files.includes("mongoose")) database = "MongoDB";

    components = fileList.filter((f) => f.endsWith(".jsx"));

    const architectureDiagram = generateArchitectureDiagram(files);

    return `
# Project Documentation

## 1. Overview
This project is a web application built using modern JavaScript technologies.

---

## 2. Tech Stack
${techStack.map((t) => `- ${t}`).join("\n")}

---

## 3. Database
- ${database}

---

## 4. System Architecture

\`\`\`mermaid
${architectureDiagram}
\`\`\`

---

## 5. Components
${components.map((c) => `- ${c}`).join("\n")}

---

## 6. How to Run

1. npm install  
2. npm run dev  

---
Generated automatically.
`;
  } catch (error) {
    console.error(error);
    throw new Error("Documentation generation failed");
  }
};
