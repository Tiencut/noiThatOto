import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturedProducts from '../src/components/Home/FeaturedProducts';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })) as any;

test('renders featured heading', async () => {
  render(<FeaturedProducts />);
  expect(screen.getByText(/Sản phẩm nổi bật/i)).toBeInTheDocument();
});