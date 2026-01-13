import { applyFilters } from '../src/lib/utils/filter';

const sample = [
  { id: 'a', name: 'Thảm cho Ranger', category: 'Thảm lót sàn', carModels: ['Ranger'], price: { shopee: 200000 }, rating: { score: 4.6 }, sales: { monthly: 10 }, updatedAt: '2026-01-01' },
  { id: 'b', name: 'Vỏ vô lăng cho City', category: 'Vỏ vô lăng', carModels: ['City'], price: { shopee: 120000 }, rating: { score: 4.2 }, sales: { monthly: 50 }, updatedAt: '2026-01-10' },
  { id: 'c', name: 'Camera hành trình', category: 'Camera hành trình', carModels: ['Innova'], price: { shopee: 500000 }, rating: { score: 4.9 }, sales: { monthly: 5 }, updatedAt: '2026-01-05' }
];

test('filter by query', () => {
  const r = applyFilters(sample, { q: 'ranger' });
  expect(r.length).toBe(1);
  expect(r[0].id).toBe('a');
});

test('filter by minRating', () => {
  const r = applyFilters(sample, { minRating: 4.5 });
  expect(r.length).toBe(2);
});

test('sort by sales', () => {
  const r = applyFilters(sample, { sortBy: 'sales' });
  expect(r[0].id).toBe('b');
});
