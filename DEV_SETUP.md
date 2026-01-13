# Developer setup

Cài đặt các công cụ dev và chạy local

1. Cài dependencies

   npm install

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
