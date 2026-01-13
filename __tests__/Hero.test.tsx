import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../src/components/Home/Hero';

test('renders hero title and buttons', () => {
  render(<Hero />);
  expect(screen.getByText(/Chọn phụ kiện xe của bạn/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Xem sản phẩm/i })).toBeInTheDocument();
});