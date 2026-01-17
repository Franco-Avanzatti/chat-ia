// app/components/Message-input.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 180) + 'px';
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter envía; Shift+Enter nueva línea
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charCount = input.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          className="rounded-[var(--radius-md)] bg-[var(--surface-2)] px-2 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-3)]"
          title="Adjuntar"
          aria-label="Adjuntar archivo"
        >
          <Paperclip size={16} />
        </button>
        <button
          className="rounded-[var(--radius-md)] bg-[var(--surface-2)] px-2 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-3)]"
          title="Plantillas"
          aria-label="Insertar plantilla"
        >
          <Sparkles size={16} />
        </button>
        <div className="flex-1" />
        <span className="text-xs text-[var(--text-secondary)]">{charCount} chars</span>
      </div>

      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribí tu mensaje… (Enter para enviar, Shift+Enter para nueva línea)"
          disabled={isLoading}
          className="flex-1 resize-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40 disabled:opacity-60"
          rows={1}
          aria-label="Área de mensaje"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-3 text-[var(--text-inverted)] hover:opacity-95 disabled:bg-[var(--surface-3)] disabled:text-[var(--text-secondary)] disabled:cursor-not-allowed"
          aria-label="Enviar"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
