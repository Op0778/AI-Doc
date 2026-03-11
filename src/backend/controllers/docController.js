import Doc from "../models/Doc.js";
import { fetchRepoFiles } from "../utils/repoUtils.js";
import { generateDocumentation } from "../utils/docGenerator.js";

export const generateDoc = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const files = await fetchRepoFiles(repoUrl);
    const generatedDoc = await generateDocumentation(files);

    const savedDoc = await Doc.create({ repoUrl, generatedDoc });

    res.json(savedDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export default exports;
