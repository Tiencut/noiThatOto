import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProducts() {
  const { data, error } = useSWR('/api/products', fetcher);
  return { products: data || [], loading: !data && !error, error };
}
