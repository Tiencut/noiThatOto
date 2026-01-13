# Deploy lên Vercel (Hướng dẫn)

Bước nhanh để deploy dự án lên Vercel (tên repo: `cardecorator-app`)

1. Tạo repo public trên GitHub và push toàn bộ code.

2. Trên Vercel: chọn "Import Project" → GitHub → chọn repo `cardecorator-app`.

3. Thiết lập Environment Variables (trên Vercel Dashboard):
   - NEXT_PUBLIC_GA_ID = G-XXXXX (tùy ý)
   - GEMINI_KEY = your_gemini_key (khi có)
   - NEXT_PUBLIC_BASE_URL = https://your-site.vercel.app

4. (Tuỳ chọn) Thiết lập secrets cho GitHub Actions (nếu bạn muốn sử dụng workflow deploy.yml):
   - VERCEL_TOKEN
   - VERCEL_PROJECT_ID
   - VERCEL_ORG_ID
   - VERCEL_SCOPE

5. Nếu muốn CI chạy unit & e2e tests, bật GitHub Actions (workflow `CI`). Playwright E2E cần `npx playwright install` được chạy in CI (workflow đã chứa step này).

6. Sau khi import, Vercel sẽ tự build và deploy trên mỗi push vào `main`.

Ghi chú bảo mật: không commit `.env.local` hoặc bất kỳ secret nào vào repo. Trên production, thay `/api/track` file-logging bằng một giải pháp analytics hợp pháp.
