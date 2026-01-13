export function buildUtm(url: string, productId: string, source = 'cardecor') {
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : '');
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', 'affiliate');
    u.searchParams.set('utm_campaign', `product_${productId}`);
    return u.toString();
  } catch (err) {
    return url;
  }
}
