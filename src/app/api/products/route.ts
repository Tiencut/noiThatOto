import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'public', 'data', 'products.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const products = JSON.parse(raw);
    return NextResponse.json(products, {
      headers: {
        // Cache at the CDN/edge for 60s and serve stale while revalidating for 5 minutes
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Cannot read products' }, { status: 500 });
  }
}
