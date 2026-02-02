// src/index.ts
import { renderFlowchart } from "mermaid-flowchart";
function renderMermaidDiagrams() {
  const containers = document.querySelectorAll(".mermaid-container");
  for (const container of containers) {
    const source = container.textContent || "";
    if (!source.trim()) continue;
    try {
      if (source.trim().startsWith("flowchart")) {
        const svg = renderFlowchart(source);
        container.innerHTML = svg;
        container.classList.add("mermaid-rendered");
      } else {
        container.innerHTML = `<pre class="mermaid-unsupported"><code>${source}</code></pre>`;
      }
    } catch (error) {
      console.error("Failed to render mermaid diagram:", error);
      container.innerHTML = `<pre class="mermaid-error"><code>${source}</code></pre>`;
    }
  }
}
var mermaidExtension = {
  name: "mermaid",
  level: "block",
  start(src) {
    return src.match(/^```mermaid/m)?.index;
  },
  tokenizer(src) {
    const match = src.match(/^```mermaid\n([\s\S]*?)\n```/);
    if (match) {
      return {
        type: "mermaid",
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    const escaped = token.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="mermaid-container">${escaped}</div>
`;
  }
};
export {
  mermaidExtension,
  renderMermaidDiagrams
};
//# sourceMappingURL=index.js.map