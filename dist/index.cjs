"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  mermaidExtension: () => mermaidExtension,
  renderMermaidDiagrams: () => renderMermaidDiagrams
});
module.exports = __toCommonJS(index_exports);
var import_mermaid_flowchart = require("mermaid-flowchart");
function renderMermaidDiagrams() {
  const containers = document.querySelectorAll(".mermaid-container");
  for (const container of containers) {
    const source = container.textContent || "";
    if (!source.trim()) continue;
    try {
      if (source.trim().startsWith("flowchart")) {
        const svg = (0, import_mermaid_flowchart.renderFlowchart)(source);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mermaidExtension,
  renderMermaidDiagrams
});
//# sourceMappingURL=index.cjs.map