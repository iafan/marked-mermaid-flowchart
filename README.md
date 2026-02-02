# marked-mermaid-flowchart

Marked extension for rendering Mermaid flowchart diagrams as SVG.

## Installation

```bash
npm install marked-mermaid-flowchart mermaid-flowchart marked
```

Or install from GitHub:

```json
{
  "dependencies": {
    "marked-mermaid-flowchart": "github:iafan/marked-mermaid-flowchart",
    "mermaid-flowchart": "github:iafan/mermaid-flowchart"
  }
}
```

## Usage

```typescript
import { marked } from 'marked'
import { mermaidExtension, renderMermaidDiagrams } from 'marked-mermaid-flowchart'

// Register the extension
marked.use({ extensions: [mermaidExtension] })

// Parse markdown
const html = marked.parse(markdown)

// Insert into DOM
document.body.innerHTML = html

// Post-process to render mermaid diagrams
renderMermaidDiagrams()
```

## How It Works

The extension intercepts code blocks marked with ` ```mermaid ` and renders them as placeholders. After the markdown is inserted into the DOM, call `renderMermaidDiagrams()` to convert placeholders to SVG diagrams.

Currently only flowchart diagrams are supported.

## API

### `mermaidExtension`

Marked extension object. Use with `marked.use({ extensions: [mermaidExtension] })`.

### `renderMermaidDiagrams(): void`

Post-processes the DOM to convert mermaid placeholders to SVG diagrams.

## Styling

See [mermaid-flowchart](https://github.com/iafan/mermaid-flowchart) for CSS variable documentation.

### Container Classes

| Class | Description |
|-------|-------------|
| `.mermaid-container` | Container for mermaid diagrams |
| `.mermaid-rendered` | Added after successful rendering |
| `.mermaid-unsupported` | Wrapper for unsupported diagram types |
| `.mermaid-error` | Wrapper when rendering fails |

## License

This is free and unencumbered software released into the public domain (Unlicense).
