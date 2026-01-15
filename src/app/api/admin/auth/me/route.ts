import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie') || '';
  const authenticated = cookie.includes('admin_session=1');
  return new Response(JSON.stringify({ authenticated }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
