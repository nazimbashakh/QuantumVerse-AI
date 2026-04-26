import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify([]), { status: 401 });
    }

    const history = await prisma.chatHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'asc' },
    });

    return new Response(JSON.stringify(history), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Bot History API Error:', error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
