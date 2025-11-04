'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="border-b border-slate-700 bg-slate-800 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-600 p-2">
          <MessageCircle size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Chat IA
          </h1>
          <p className="text-sm text-slate-400">
            Powered by Groq
          </p>
        </div>
      </div>
    </div>
  );
}