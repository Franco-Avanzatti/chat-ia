'use client';

import ChatInterface from '../components/chat-interface';

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="h-full w-full max-w-4xl rounded-lg bg-slate-800 shadow-2xl md:h-[90vh] md:rounded-xl md:shadow-2xl">
        <ChatInterface />
      </div>
    </main>
  );
}