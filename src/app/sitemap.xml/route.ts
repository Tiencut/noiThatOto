import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = process.env.VERCEL_URL ? 'https' : 'http';
    const base = `${protocol}://${host}`;

    const dataPath = path.join(process.cwd(), 'public', 'data', 'products.json');
    let products: any[] = [];
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf-8');
      products = JSON.parse(raw);
    }

    const urls = new Set<string>();
    // Add homepage and key pages
    urls.add(`${base}/`);
    urls.add(`${base}/products`);
    urls.add(`${base}/car-brands`);
    urls.add(`${base}/compare`);

    products.forEach((p) => {
      if (p && p.id) urls.add(`${base}/products/${p.id}`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(urls)
      .map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`)
      .join('\n')}\n</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'sitemap_failed' }, { status: 500 });
  }
}
