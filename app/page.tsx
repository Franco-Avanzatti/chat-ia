'use client';

import { useEffect, useState } from 'react';
import ChatInterface from '../components/ChatInterface';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem('michat:messages');
    if (!raw) return [];

    const parsed = JSON.parse(raw) as Message[];
    return parsed.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch {
    return [];
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(loadMessages);

  // Persistencia local (esto está perfecto)
  useEffect(() => {
    localStorage.setItem('michat:messages', JSON.stringify(messages));
  }, [messages]);

  const handleNewConversation = () => {
    if (confirm('¿Seguro que querés iniciar una nueva conversación?')) {
      setMessages([]);
      localStorage.removeItem('michat:messages');
    }
  };

  return (
    <main className="flex h-screen w-screen bg-[var(--background)] transition-colors duration-300">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-none border border-[var(--border)] bg-[var(--surface-1)] shadow-[var(--shadow-lg)]">
        <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--primary)]/10 px-6 py-4">
          <h1 className="text-lg font-semibold tracking-wide text-[var(--primary)]">💬 MiChat</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewConversation}
              className="rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--text-inverted)] shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40"
            >
              Nueva conversación
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <ChatInterface messages={messages} setMessages={setMessages} />
        </div>

        <footer className="border-t border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-center text-xs text-[var(--text-secondary)]">
          © 2025 MiChat
        </footer>
      </div>
    </main>
  );
}
