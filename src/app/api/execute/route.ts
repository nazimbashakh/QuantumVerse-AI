import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { code, language } = await req.json();

    if (!code || language !== 'python') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Forward to FastAPI execution engine
    const executeRes = await fetch(`${apiUrl}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.JWT_SECRET}`,
      },
      body: JSON.stringify({ code, language }),
    });

    if (!executeRes.ok) {
      throw new Error(`Execution engine returned ${executeRes.status}`);
    }

    const result = await executeRes.json();

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Execution API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to execute code' }), { status: 500 });
  }
}
