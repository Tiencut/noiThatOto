// Gemini helper: uses GEMINI_KEY if provided (server-side). Falls back to mock if not configured.
export async function getAiInfo(productName: string) {
  const key = process.env.GEMINI_KEY;
  if (!key) {
    return {
      fitVehicle: `✅ Fit phổ biến cho nhiều model, kiểm tra chi tiết trên trang sản phẩm`,
      material: `✅ Chất liệu bền, thông thường là cao su/tpu hoặc vải tổng hợp`,
      installation: `✅ Lắp đơn giản, không cần công cụ chuyên dụng`,
      durability: `✅ Bền từ 2-5 năm tùy điều kiện`,
      bestFor: `👌 Người cần tính tiện dụng & chống bẩn`
    };
  }

  // Example request to Gemini HTTP API - adapt to your provider's endpoint & auth
  try {
    const resp = await fetch('https://api.gemini.example/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({ prompt: `Tóm tắt sản phẩm: ${productName}\nTrả về JSON với các field: fitVehicle, material, installation, durability, bestFor`, max_tokens: 400 })
    });
    if (!resp.ok) throw new Error('Gemini error');
    const json = await resp.json();
    // expect json to have fields - adapt parsing to actual API response
    return json;
  } catch (err) {
    console.error('Gemini fetch failed', err);
    return {
      fitVehicle: `✅ Fit phổ biến - kiểm tra mô tả`,
      material: `✅ Chất liệu bền`,
      installation: `✅ Lắp đơn giản`,
      durability: `✅ Bền trung bình 2-5 năm`,
      bestFor: `👌 Người cần tiện lợi`
    };
  }
}
