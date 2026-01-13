import { NextResponse } from 'next/server';
import { getAiInfo } from '../../../lib/api/gemini';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || '';
    const ai = await getAiInfo(name);
    return NextResponse.json(ai);
  } catch (err) {
    return NextResponse.json({ error: 'cannot get recommendation' }, { status: 500 });
  }
}
