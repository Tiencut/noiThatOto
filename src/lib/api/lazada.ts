// Lazada API stub
export async function fetchLazadaProduct(id: string) {
  return { id, url: `https://lazada.vn/product/${id}`, price: null };
}
