"use client";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownPreviewProps {
  text: string;
}

const MarkdownPreview = ({ text }: MarkdownPreviewProps) => {
  return (
    <div className="prose max-w-none wrap-break-word overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // --- STRUCTURAL ELEMENTS ---
          // Using div for p to prevent hydration errors with nested block elements
          p: ({ children }) => (
            <div className="mb-4 leading-relaxed text-black last:mb-0">
              {children}
            </div>
          ),

          // --- HEADINGS ---
          h1: ({ children }) => <h1 className="text-4xl font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold text-foreground mt-6 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-semibold text-foreground mt-6 mb-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h4>,
          h5: ({ children }) => <h5 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h5>,
          h6: ({ children }) => <h6 className="text-base font-semibold text-foreground mt-3 mb-2">{children}</h6>,

          // --- INLINE STYLE ---
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          del: ({ children }) => <del className="line-through text-muted-foreground">{children} </del>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-600 font-semibold hover:underline underline-offset-1 transition-all">
              {children}
            </a>
          ),

          // --- LISTS & TASKS ---
          ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          input: ({ type, checked }) => {
            if (type === 'checkbox') {
              return <input type="checkbox" checked={checked} readOnly className="mr-2 h-4 w-4 rounded border-gray-300 align-middle" />;
            }
            return null;
          },

          // --- CODE BLOCKS & INLINE CODE ---
          pre: ({ children }) => (
            <div className="my-4 overflow-hidden rounded-lg border border-border shadow-sm">
              {children}
            </div>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            
            // Inline Code (stays on the same line)
            if (!match && inline !== false) {
              return (
                <code className="bg-neutral-200 text-violet-700 px-1.5 py-0.5 rounded font-mono text-sm mx-0.5">
                  {children}
                </code>
              );
            }

            // Block Code (Syntax Highlighted)
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match?.[1] ?? 'text'}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1.25rem',
                  background: '#0f172a',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },

          // --- TABLES ---
          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-lg border border-gray-400">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-300">{children}</thead>,
          th: ({ children }) => <th className="border-b border-gray-400 px-4 py-2 font-bold text-left">{children}</th>,
          td: ({ children }) => <td className="border-b border-gray-400 px-4 py-2">{children}</td>,
          tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,

          // --- MISC ---
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-violet-600 bg-neutral-100 px-5 py-3 my-5 italic rounded-r-lg shadow-sm">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-neutral-300" />,
          img: ({ src, alt }) => (
            <div className="flex flex-col items-center my-6">
              <img src={src} alt={alt} className="max-w-full h-auto rounded-xl shadow-md" />
              {alt && <span className="text-xs text-muted-foreground mt-2 italic">{alt}</span>}
            </div>
          ),
          
          // Footnotes, Subscripts, Superscripts (supported via Remark-GFM)
          sub: ({ children }) => <sub className="text-[0.8em]">{children}</sub>,
          sup: ({ children }) => <sup className="text-[0.8em]">{children}</sup>,
          
          // Details / Collapsible
          details: ({ children }) => (
            <details className="my-4 p-4 rounded-lg border border-border bg-white shadow-sm cursor-pointer group">
              {children}
            </details>
          ),
          summary: ({ children }) => (
            <summary className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {children}
            </summary>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;