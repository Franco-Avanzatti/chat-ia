// app/components/Chat-interface.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import ChatMessage from './Chat-message';
import MessageInput from './Message-input';
import ChatHeader from './Chat-header';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Error en la respuesta de la API');
      }

      // Creamos el mensaje del asistente y vamos acumulando el streaming
      const assistantId = crypto.randomUUID();
      let accumulated = '';

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', timestamp: new Date() },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Actualizamos solo el mensaje del asistente actual
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch (err) {
      if ((err as any).name === 'AbortError') {
        setError('Generación detenida por el usuario');
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido ocurrió');
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleCancel = () => {
    abortController?.abort();
    setAbortController(null);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-col bg-[var(--surface-1)]">
      <ChatHeader />

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {!messages.length && !error && !isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
                Bienvenido al Chat IA
              </h2>
              <p className="text-[var(--text-secondary)]">
                Comenzá escribiendo tu primer mensaje
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-[var(--radius-md)] bg-[#ef4444]/12 p-4 text-[#ef4444] border border-[#ef4444]/30">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
            <div className="mt-2">
              <button
                onClick={() => setError(null)}
                className="text-xs underline text-[var(--text-secondary)] hover:text-[var(--primary)]"
              >
                Ocultar
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="mb-4 flex items-center gap-3" aria-live="polite">
            <div className="rounded-[var(--radius-md)] bg-[var(--surface-2)] p-4 text-[var(--text-secondary)] border border-[var(--border)]">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:120ms]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-secondary)] [animation-delay:240ms]"></div>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="text-xs rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-3)]"
              aria-label="Detener generación"
            >
              Detener
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-1)] p-4 md:p-6">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
