import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ANALYTICS_ENDPOINT = process.env.ANALYTICS_ENDPOINT || '';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = { productId: data.productId, channel: data.channel, ts: new Date().toISOString() };

    if (ANALYTICS_ENDPOINT) {
      // send minimal data to analytics endpoint (server-side)
      try {
        await fetch(ANALYTICS_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        return NextResponse.json({ ok: true });
      } catch (err) {
        console.error('Analytics POST failed', err);
        // fallthrough to write to file as backup
      }
    }

    const dir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'affiliate-clicks.log');
    fs.appendFileSync(file, JSON.stringify(payload) + '\n');
    return NextResponse.json({ ok: true, fallback: 'file' });
  } catch (err) {
    return NextResponse.json({ error: 'cannot track' }, { status: 500 });
  }
}