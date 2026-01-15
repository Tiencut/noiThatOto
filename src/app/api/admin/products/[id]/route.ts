import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const buf = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(buf);
    const idx = data.findIndex((p: any) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const now = new Date().toISOString().slice(0, 10);
    data[idx] = { ...data[idx], ...body, updatedAt: now };
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json(data[idx]);
  } catch (err) {
    return NextResponse.json({ error: 'Could not update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const buf = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(buf);
    const idx = data.findIndex((p: any) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const removed = data.splice(idx, 1)[0];
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ removed });
  } catch (err) {
    return NextResponse.json({ error: 'Could not delete product' }, { status: 500 });
  }
}
