// app/components/Chat-message.tsx
'use client';
import { Message } from "./Message";
import { Copy } from "lucide-react";

interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatMessage({ message }: { message: MessageType }) {
  const isUser = message.role === 'user';

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  const bubbleBase =
    "max-w-xs md:max-w-md lg:max-w-lg rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-sm)] border";
  const bubbleUser = `${bubbleBase} bg-[var(--primary)] text-[var(--text-inverted)] border-transparent`;
  const bubbleAssistant = `${bubbleBase} bg-[var(--surface-2)] text-[var(--text-primary)] border-[var(--border)]`;

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <article
        className={`${isUser ? bubbleUser : bubbleAssistant} group`}
        role="article"
        aria-label={isUser ? 'Mensaje del usuario' : 'Mensaje del asistente'}
      >
        <header className="mb-2 flex items-center justify-between">
          <span className="text-[10px] px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-3)]/50 text-[var(--text-secondary)]">
            {message.role.toUpperCase()}
          </span>
          <button
            className="opacity-0 group-hover:opacity-100 transition text-xs text-[var(--text-secondary)] hover:text-[var(--primary)]"
            aria-label="Copiar mensaje"
            onClick={() => navigator.clipboard.writeText(message.content)}
            title="Copiar"
          >
            <Copy size={14} />
          </button>
        </header>

        <Message content={message.content} />

        <p className={`mt-2 text-xs ${isUser ? 'text-[var(--text-inverted)]/80' : 'text-[var(--text-secondary)]'}`}>
          {formatTime(message.timestamp)}
        </p>
      </article>
    </div>
  );
}
