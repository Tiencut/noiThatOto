import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = body?.password;
    const expected = process.env.ADMIN_PASSWORD || '';
    if (!expected) {
      return new Response(JSON.stringify({ ok: false, error: 'No admin password configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    if (password === expected) {
      // Set a simple HttpOnly cookie for session (dev-friendly)
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `admin_session=1; Path=/; HttpOnly; Max-Age=${maxAge}`,
        },
      });
    }
    return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: 'bad request' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
