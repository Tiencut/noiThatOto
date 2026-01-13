import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'logs', 'affiliate-clicks.log');
    if (!fs.existsSync(file)) return NextResponse.json({ lines: [] });
    const content = fs.readFileSync(file, 'utf-8').trim();
    const lines = content ? content.split('\n').reverse().slice(0, 200) : [];
    return NextResponse.json({ lines });
  } catch (err) {
    return NextResponse.json({ error: 'cannot read logs' }, { status: 500 });
  }
}