import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PriceCompare from '../src/components/Product/PriceCompare';

global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as any;

describe('PriceCompare', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  const productId = 'sp_test';
  const price = { shopee: 100000, lazada: 120000, tiktok: 110000, original: 150000 };
  const affiliate = { shopee: 'https://shopee.example/sp_test', lazada: 'https://lazada.example/sp_test', tiktok: 'https://tiktok.example/sp_test' };

  test('renders prices and highlights best price', () => {
    render(<PriceCompare productId={productId} price={price} affiliate={affiliate} />);

    expect(screen.getByText('Shopee')).toBeInTheDocument();
    expect(screen.getByText('Lazada')).toBeInTheDocument();
    expect(screen.getByText('TikTok')).toBeInTheDocument();

    // best price is Shopee (100k)
    const bestBadge = screen.getByText('Giá tốt nhất');
    expect(bestBadge).toBeInTheDocument();
  });

  test('clicking buy triggers track API', async () => {
    render(<PriceCompare productId={productId} price={price} affiliate={affiliate} />);
    const shopeeBtn = screen.getByRole('link', { name: /Mua trên Shopee/i });
    await userEvent.click(shopeeBtn);
    // onClick triggers a POST to /api/track
    expect(global.fetch).toHaveBeenCalled();
    const [url, opts] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toContain('/api/track');
    expect(opts.method).toBe('POST');
  });
});
