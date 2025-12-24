import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing your markdown here..."
      className="h-full min-h-[calc(100vh-12rem)] resize-none bg-editor-bg border-editor-border font-mono text-sm leading-relaxed p-6 focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-muted-foreground/50"
    />
  );
};

export default MarkdownEditor;
