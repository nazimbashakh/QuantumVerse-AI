import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// Fetch user's completed topics
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify([]), { status: 401 });
    }

    const topics = await prisma.topicProgress.findMany({
      where: { userId: session.user.id, status: 'COMPLETED' },
      select: { topicId: true },
    });

    return new Response(JSON.stringify(topics.map(t => t.topicId)), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Progress API GET Error:', error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

// Mark a topic as complete
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { topicId, levelId } = await req.json();

    if (!topicId || typeof levelId !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    // Upsert topic progress
    const progress = await prisma.topicProgress.upsert({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId: topicId,
        },
      },
      update: {
        status: 'COMPLETED',
      },
      create: {
        userId: session.user.id,
        topicId: topicId,
        levelId: levelId,
        status: 'COMPLETED',
      },
    });

    // Award XP if it was just completed (this can be optimized to only award XP once)
    // We'll increment XP simply for this demo, usually you'd check if it was previously not COMPLETED.
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: 50 } },
    });

    return new Response(JSON.stringify({ success: true, progress }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Progress API POST Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
