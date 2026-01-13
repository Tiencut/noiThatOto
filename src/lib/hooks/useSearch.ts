import { useState } from 'react';

export function useSearch(initial = '') {
  const [q, setQ] = useState(initial);
  return { q, setQ };
}
