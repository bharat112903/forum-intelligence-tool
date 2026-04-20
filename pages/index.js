import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("Leads");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, goal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutput(data.report);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Forum Intelligence Tool</h1>
      <div style={styles.formGroup}>
        <label htmlFor="product" style={styles.label}>Product Name</label>
        <input
          id="product"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="goal" style={styles.label}>Goal</label>
        <select
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={styles.input}
        >
          <option value="Leads">Leads</option>
          <option value="Traffic">Traffic</option>
          <option value="Awareness">Awareness</option>
        </select>
      </div>
      <button onClick={handleGenerate} style={styles.button} disabled={loading}>
        {loading ? "Generating..." : "Generate Report"}
      </button>
      <div style={styles.outputBox}>
        <h2 style={styles.outputHeading}>Output</h2>
        <pre style={styles.pre}>{output || "Your report will appear here."}</pre>
      </div>
    </main>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  heading: { marginBottom: "24px" },
  formGroup: { marginBottom: "16px" },
  label: { display: "block", marginBottom: "8px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px", fontSize: "16px" },
  button: { padding: "10px 16px", fontSize: "16px", cursor: "pointer", marginBottom: "24px" },
  outputBox: { border: "1px solid #ccc", padding: "16px", borderRadius: "6px", background: "#f9f9f9" },
  outputHeading: { marginTop: 0 },
  pre: { whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 },
};
