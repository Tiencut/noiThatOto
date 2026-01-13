export function formatCurrency(v?: number) {
  if (!v && v !== 0) return '';
  return v.toLocaleString('vi-VN') + '₫';
}
