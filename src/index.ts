import type { TokenizerExtension, RendererExtension } from 'marked'
import { renderFlowchart } from 'mermaid-flowchart'

/**
 * Post-process rendered HTML to convert mermaid containers to actual diagrams.
 * Call this after marked.parse() completes and DOM is ready.
 */
export function renderMermaidDiagrams(): void {
  const containers = document.querySelectorAll<HTMLElement>('.mermaid-container')

  for (const container of containers) {
    const source = container.textContent || ''
    if (!source.trim()) continue

    try {
      // Currently only flowcharts are supported
      if (source.trim().startsWith('flowchart')) {
        const svg = renderFlowchart(source)
        container.innerHTML = svg
        container.classList.add('mermaid-rendered')
      } else {
        // Unsupported diagram type - show as code
        container.innerHTML = `<pre class="mermaid-unsupported"><code>${source}</code></pre>`
      }
    } catch (error) {
      console.error('Failed to render mermaid diagram:', error)
      container.innerHTML = `<pre class="mermaid-error"><code>${source}</code></pre>`
    }
  }
}

/**
 * Marked extension that intercepts mermaid code blocks.
 * Use with: marked.use({ extensions: [mermaidExtension] })
 */
export const mermaidExtension: TokenizerExtension & RendererExtension = {
  name: 'mermaid',
  level: 'block',
  start(src: string) {
    return src.match(/^```mermaid/m)?.index
  },
  tokenizer(src: string) {
    const match = src.match(/^```mermaid\n([\s\S]*?)\n```/)
    if (match) {
      return {
        type: 'mermaid',
        raw: match[0],
        text: match[1],
      }
    }
  },
  renderer(token) {
    // Escape HTML in the source to prevent XSS
    const escaped = token.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return `<div class="mermaid-container">${escaped}</div>\n`
  },
}
