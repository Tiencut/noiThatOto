import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // clear cookie
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Max-Age=0',
    },
  });
}
