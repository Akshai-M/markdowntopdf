export const sampleMarkdown = `# Welcome to Markdown Preview

This is a **beautiful** markdown editor with *live preview*. Start typing on the left to see changes instantly!

## Features

- **Live Preview**: See your markdown rendered in real-time
- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **GFM Support**: Tables, task lists, strikethrough, and more
- **Beautiful Typography**: Clean, readable output

## Code Examples

Inline code looks like \`const hello = "world"\` in your text.

\`\`\`javascript
// JavaScript code with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('Developer');
console.log(message);
\`\`\`

\`\`\`python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Headings | ✅ | H1 through H6 |
| Bold/Italic | ✅ | **bold** and *italic* |
| Lists | ✅ | Ordered and unordered |
| Code Blocks | ✅ | With syntax highlighting |
| Tables | ✅ | Full GFM support |
| Blockquotes | ✅ | Styled beautifully |

## Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

## Task Lists

- [x] Create markdown parser
- [x] Add syntax highlighting
- [x] Style tables beautifully
- [ ] Add more themes
- [ ] Export functionality

## Links and Images

Check out [GitHub](https://github.com) for more resources.

---

### Try It Yourself!

Edit the text on the left panel to see live changes here. The preview updates instantly as you type!
`;
