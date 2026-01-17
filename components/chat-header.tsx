'use client';
import { MessageCircle } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface-1)] p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-[var(--radius-md)] bg-[var(--primary)]/90 p-2 shadow-[var(--shadow-sm)]">
          <MessageCircle size={24} className="text-[var(--text-inverted)]" />
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-2xl text-[var(--text-primary)]">Chat IA</h1>
          <p className="text-sm text-[var(--text-secondary)]">Modelo: Groq • Espacio: Personal</p>
        </div>
      </div>
    </div>
  );
}
