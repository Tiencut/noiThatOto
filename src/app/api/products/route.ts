import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const products = JSON.parse(raw);
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: 'Cannot read products' }, { status: 500 });
  }
}
