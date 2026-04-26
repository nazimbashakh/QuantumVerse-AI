import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request payload', { status: 400 });
    }

    // Get only the user's latest message to save
    const latestUserMessage = messages[messages.length - 1];

    if (latestUserMessage?.role === 'user') {
      await prisma.chatHistory.create({
        data: {
          userId: session.user.id,
          role: 'user',
          content: latestUserMessage.content,
        },
      });
    }

    // Setup system prompt for QuantumBot
    const systemPrompt = `You are QuantumBot, an expert AI tutor on Quantum Computing for the QuantumVerse AI platform. 
Your goal is to explain complex quantum concepts simply, accurately, and engagingly.
Use markdown formatting, emojis, and analogies where appropriate. Do not be overly verbose.
Keep your responses well-structured. If asked for code, use Qiskit or Cirq.
If asked about non-quantum topics, politely redirect back to quantum computing.`;

    const stream = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let fullAssistantResponse = '';

        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              const text = chunk.delta.text;
              fullAssistantResponse += text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }

          // Save the full assistant response to db
          if (fullAssistantResponse) {
            await prisma.chatHistory.create({
              data: {
                userId: session.user.id,
                role: 'assistant',
                content: fullAssistantResponse,
              },
            });
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error('Anthropic stream error', err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('QuantumBot API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
