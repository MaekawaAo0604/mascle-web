import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 gradient-text">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold mb-3 text-primary">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>,
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
          a: ({ href, children }) => (
            <a href={href} className="text-primary hover:text-primary-light underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt || ''} className="rounded-lg my-4 max-w-full h-auto" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-dark-card px-2 py-1 rounded text-primary-light">{children}</code>
            ) : (
              <code className="block bg-dark-card p-4 rounded-lg overflow-x-auto my-4">{children}</code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-dark-border">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-dark-card">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-dark-border">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-2 text-left font-bold">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2 text-gray-300">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
