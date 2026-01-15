import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');

export async function GET() {
  try {
    const buf = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(buf);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Could not read products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const buf = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(buf);
    const id = body.id || `sp_${(Date.now() % 1000000).toString().padStart(6, '0')}`;
    const now = new Date().toISOString().slice(0, 10);
    const item = { ...body, id, createdAt: now, updatedAt: now };
    data.unshift(item);
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Could not create product' }, { status: 500 });
  }
}
