import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        topicProgress: {
          where: { status: 'COMPLETED' },
          select: { id: true },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({
      xp: user.xp,
      streakDays: user.streakDays,
      completedTopics: user.topicProgress.length,
      level: user.level,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), { status: 500 });
  }
}
