export const generateArchitectureDiagram = (files) => {
  const fileList = files.split("\n").filter(Boolean);

  const sections = {
    components: [],
    pages: [],
    controllers: [],
    models: [],
    routes: [],
    utils: [],
  };

  fileList.forEach((file) => {
    if (file.includes("node_modules") || file.includes("package.json")) return;

    let name = file.split("/").pop();

    // remove extension
    name = name.replace(/\.(js|jsx|ts|tsx)/, "");

    // remove special characters
    name = name.replace(/[^a-zA-Z0-9]/g, "");

    if (!name) return;

    if (file.includes("components")) sections.components.push(name);
    if (file.includes("pages")) sections.pages.push(name);
    if (file.includes("controllers")) sections.controllers.push(name);
    if (file.includes("models")) sections.models.push(name);
    if (file.includes("routes")) sections.routes.push(name);
    if (file.includes("utils")) sections.utils.push(name);
  });

  const render = (parent, list) =>
    [...new Set(list)]
      .map((item) => `${parent} --> ${parent}_${item}[${item}]`)
      .join("\n");

  return `
flowchart TB
A[Project]

A --> B[Frontend]
A --> C[Backend]

subgraph Frontend
D[Components]
${render("D", sections.components)}

E[Pages]
${render("E", sections.pages)}
end

subgraph Backend
F[Controllers]
${render("F", sections.controllers)}

G[Models]
${render("G", sections.models)}

H[Routes]
${render("H", sections.routes)}

I[Utils]
${render("I", sections.utils)}
end
`;
};
