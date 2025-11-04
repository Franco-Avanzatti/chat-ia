import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

interface MessageRequest {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages: MessageRequest[] };

    if (!messages || messages.length === 0) {
      return Response.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    // Llamar a Groq para generar una respuesta
    // <CHANGE> Cambié el modelo a llama-3.3-70b-versatile (modelo actual de Groq)
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages,
    });

    return Response.json({
      content: text,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json(
      { error: 'Error processing chat request' },
      { status: 500 }
    );
  }
}