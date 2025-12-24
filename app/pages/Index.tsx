import { useState, useRef } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import { sampleMarkdown } from '@/data/sampleMarkdown';
import { FileText, Eye, Code2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    if (markdown.length >= 20) {
      document.body.classList.add('print-preview-only');

      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const cleanup = () => document.body.classList.remove('print-preview-only');
      window.addEventListener('afterprint', cleanup, { once: true });

      window.print();
      return;
    }

    // Dynamically import html2pdf only on the client side
    const html2pdf = (await import('html2pdf.js')).default;

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 210mm;
      max-width: 210mm;
      background-color: #ffffff;
      color: #000000;
      padding: 15mm;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    `;

    // Clone and style the content
    const element = previewRef.current.cloneNode(true) as HTMLElement;
    element.style.cssText = `
      background-color: #ffffff;
      color: #000000;
      width: 100%;
      max-width: 100%;
    `;

    // Apply styles to all child elements for proper PDF rendering
    const allElements = element.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.maxWidth = '100%';
      htmlEl.style.wordWrap = 'break-word';
      htmlEl.style.overflowWrap = 'break-word';

      // Ensure text colors are black
      const computedStyle = window.getComputedStyle(htmlEl);
      if (computedStyle.color) {
        htmlEl.style.color = '#000000';
      }

      // Handle code blocks specially
      if (htmlEl.tagName === 'PRE' || htmlEl.tagName === 'CODE') {
        htmlEl.style.whiteSpace = 'pre-wrap';
        htmlEl.style.wordBreak = 'break-word';
        htmlEl.style.backgroundColor = '#f5f5f5';
        htmlEl.style.color = '#1a1a1a';
      }

      // Prevent page breaks inside these elements
      if (['P', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(htmlEl.tagName)) {
        htmlEl.style.pageBreakInside = 'avoid';
      }
    });

    container.appendChild(element);
    document.body.appendChild(container);

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: 'markdown-preview.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        letterRendering: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight,
      },
      jsPDF: {
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const,
        compress: true,
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'] as const,
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['pre', 'code', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'table'],
      },
    };

    try {
      await html2pdf().set(opt).from(container).save();
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-450 mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Markdown Preview</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hidden sm:inline">{markdown.length} characters</span>
            <Button onClick={handleExportPDF} size="sm" variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-450 mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
          {/* Editor Panel */}
          <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <Code2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Markdown</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Preview</span>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div ref={previewRef}>
                <MarkdownPreview text={markdown} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;