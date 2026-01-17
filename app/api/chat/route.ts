// route.ts
import { generateText, type ModelMessage } from 'ai';
import { groq } from '@ai-sdk/groq';
import { SYSTEM_PROMPT } from '@/app/system-prompt';

const ALLOWED_ROLES: Array<ModelMessage['role']> = ['system', 'user', 'assistant', 'tool'];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages: ModelMessage[] };

    if (!messages || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Validar roles
    const invalid = messages.filter(m => !ALLOWED_ROLES.includes(m.role));
    if (invalid.length > 0) {
      return Response.json(
        { error: `Invalid role(s) detected: ${invalid.map(m => m.role).join(', ')}` },
        { status: 400 }
      );
    }

    // Combinar SYSTEM PROMPT + historial del usuario
    const finalMessages: ModelMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Llamar al modelo con tu configuración personalizada
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: finalMessages,
      temperature: 0.2,
    });

    return Response.json({ content: text });

  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json({ error: 'Error processing chat request' }, { status: 500 });
  }
}
