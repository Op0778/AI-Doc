import mermaid from "mermaid";
import { marked } from "marked";
import { useEffect, useRef } from "react";

export default function DocPage({ doc }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!doc) return;

    ref.current.innerHTML = marked.parse(doc);

    mermaid.initialize({ startOnLoad: false });

    mermaid.run({
      nodes: ref.current.querySelectorAll(".language-mermaid"),
    });
  }, [doc]);

  return (
    <div className="viewer">
      <h3>Generated Documentation</h3>
      <div ref={ref}></div>
    </div>
  );
}
