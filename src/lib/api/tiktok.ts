// TikTok Shop API stub
export async function fetchTiktokProduct(id: string) {
  return { id, url: `https://tiktok.com/product/${id}`, price: null };
}
