'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github-dark.css';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    try {
      const result = hljs.highlight(code, { language });
      setHighlightedCode(result.value);
    } catch {
      setHighlightedCode(code);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers or when clipboard API is not available
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 bg-background/80 backdrop-blur"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>

      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm pt-12">
        <code
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className={`hljs language-${language}`}
        />
      </pre>
    </div>
  );
}
