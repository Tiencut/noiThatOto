import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'affiliate-clicks.log');
    fs.appendFileSync(file, JSON.stringify({ ...data, ts: new Date().toISOString() }) + '\n');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'cannot track' }, { status: 500 });
  }
}