import React from 'react';

export default function AffiliateLinks({ affiliate, productId }: { affiliate: any; productId: string }) {
  const buildUtm = (url: string, channel: string) => {
    try {
      const u = new URL(url, window.location.origin);
      u.searchParams.set('utm_source', 'cardecor');
      u.searchParams.set('utm_medium', 'affiliate');
      u.searchParams.set('utm_campaign', `product_${productId}`);
      return u.toString();
    } catch (err) {
      return url;
    }
  };

  return (
    <div className="flex gap-2">
      {affiliate?.shopee && <a href={buildUtm(affiliate.shopee, 'shopee')} className="px-3 py-2 bg-orange-100 text-orange-800 rounded" target="_blank" rel="noopener noreferrer">Shopee</a>}
      {affiliate?.lazada && <a href={buildUtm(affiliate.lazada, 'lazada')} className="px-3 py-2 bg-blue-100 text-blue-800 rounded" target="_blank" rel="noopener noreferrer">Lazada</a>}
      {affiliate?.tiktok && <a href={buildUtm(affiliate.tiktok, 'tiktok')} className="px-3 py-2 bg-pink-100 text-pink-800 rounded" target="_blank" rel="noopener noreferrer">TikTok</a>}
    </div>
  );
}
