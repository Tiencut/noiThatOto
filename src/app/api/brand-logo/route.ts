import { NextResponse } from 'next/server';

// Proxy endpoint to fetch brand logos from Brandfetch (server-side). Requires BRANDFETCH_KEY env var.
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    if (!name) return NextResponse.json({ error: 'missing_name' }, { status: 400 });

    const key = process.env.BRANDFETCH_KEY;
    if (!key) {
      // If no Brandfetch key is provided, fall back to a local placeholder image
      const res = NextResponse.redirect('/icons/default-brand.svg', 307);
      res.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
      return res;
    }

    const bfRes = await fetch(`https://api.brandfetch.io/v2/brands/${encodeURIComponent(name.toLowerCase())}`, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: 'application/json'
      }
    });

    if (!bfRes.ok) {
      // On Brandfetch failure, fall back to local placeholder instead of erroring
      const res = NextResponse.redirect('/icons/default-brand.svg', 307);
      res.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
      return res;
    }
    const data = await bfRes.json();

    // Try common locations for a usable logo URL
    const logo = data?.logo || data?.logoHorizontal || data?.logoVertical || data?.logos?.[0]?.formats?.png?.downloadUri || data?.logos?.[0]?.formats?.svg?.downloadUri || null;

    if (!logo) {
      const res = NextResponse.redirect('/icons/default-brand.svg', 307);
      res.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
      return res;
    }

    // Redirect the client to the actual logo URL so the browser can load it directly.
    const res = NextResponse.redirect(logo, 307);
    // Cache logos at the edge for 1 day
    res.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
    return res;
  } catch (err) {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 500 });
  }
}
