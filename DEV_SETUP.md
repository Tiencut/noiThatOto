# Developer setup

Cài đặt các công cụ dev và chạy local

1. Cài dependencies

   npm install

   Nếu gặp lỗi peer-deps (ví dụ do React 19 vs testing libs), có thể chạy tạm thời với:

   npm install --legacy-peer-deps

   hoặc

   npm install --force

   Lưu ý: `--legacy-peer-deps` là workaround để phát triển nhanh; để lâu dài nên chỉnh `package.json` để tương thích các phiên bản.
2. Tạo data mẫu (100 products)

   npm run generate-data

3. Chạy dev server

   npm run dev

4. Unit tests (Jest)

   npm run test

5. E2E tests (Playwright)

   npm i -D @playwright/test
   npx playwright install
   npm run e2e

Lưu ý: E2E tests giả định bạn đang chạy server tại `http://localhost:3000`. Bạn có thể set `PW_BASE_URL` để chỉ tới host khác.
