// Mock Gemini API helper. Replace with real implementation when you provide GEMINI_KEY.
export async function getAiInfo(productName: string) {
  // simple mock summary
  return {
    fitVehicle: `✅ Fit phổ biến cho nhiều model, kiểm tra chi tiết trên trang sản phẩm`,
    material: `✅ Chất liệu bền, thông thường là cao su/tpu hoặc vải tổng hợp`,
    installation: `✅ Lắp đơn giản, không cần công cụ chuyên dụng`,
    durability: `✅ Bền từ 2-5 năm tùy điều kiện`,
    bestFor: `👌 Người cần tính tiện dụng & chống bẩn`
  };
}
