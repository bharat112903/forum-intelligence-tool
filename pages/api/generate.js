async function buildReport({ product, goal }) {
  return [
    `Product: ${product}`,
    `Goal: ${goal}`,
    "",
    "Forum Intelligence Summary",
    "- Audience signals: Dummy data (replace with AI later)",
    "- Popular discussion themes: Dummy data (replace with AI later)",
    "- Suggested communities: Dummy data (replace with AI later)",
    "- Recommended next step: Integrate AI API inside buildReport()",
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product, goal } = req.body;

  if (!product || !goal) {
    return res.status(400).json({ error: "Product and goal are required" });
  }

  try {
    const report = await buildReport({ product, goal });
    return res.status(200).json({ report });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
