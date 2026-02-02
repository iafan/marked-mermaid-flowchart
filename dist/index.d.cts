import { TokenizerExtension, RendererExtension } from 'marked';

/**
 * Post-process rendered HTML to convert mermaid containers to actual diagrams.
 * Call this after marked.parse() completes and DOM is ready.
 */
declare function renderMermaidDiagrams(): void;
/**
 * Marked extension that intercepts mermaid code blocks.
 * Use with: marked.use({ extensions: [mermaidExtension] })
 */
declare const mermaidExtension: TokenizerExtension & RendererExtension;

export { mermaidExtension, renderMermaidDiagrams };
