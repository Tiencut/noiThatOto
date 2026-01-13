# Crawler docs (dev)

Nội dung:

- Scripts ở `scripts/`:
  - `crawl-shopee.py`, `crawl-lazada.py`, `crawl-tiktok.py` - hiện là mock/crawl skeleton
  - `generate-json.py` - merge crawled outputs vào `public/data/products.json`

- Workflow `/.github/workflows/data-update.yml` chạy quarterly (1 Jan/Apr/Jul/Oct) và thực hiện:
  1. Chạy crawler scripts (mock)
  2. Merge outputs
  3. Commit products.json nếu có thay đổi

- Lưu ý quan trọng:
  - Trước khi chạy crawler thật, kiểm tra Terms of Service của từng nền tảng và nếu có thể dùng **official affiliate APIs** thì ưu tiên.
  - Thêm proxy/rotating IP, rate-limiting và caching nếu cần.
  - Production: store crawled data in a proper DB (e.g., Supabase, Postgres) and avoid committing large data files to git.
