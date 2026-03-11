import "../styles/DocPage.css";

export default function DocPage({ doc }) {
  return (
    <div className="viewer">
      <h3>Generated Documentation</h3>
      <pre>{doc}</pre>
    </div>
  );
}
