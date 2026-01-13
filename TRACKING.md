# Tracking & Logs

- Khi người dùng click nút "Mua trên ..." trong `PriceCompare`, component sẽ gọi POST `/api/track` để ghi click vào file `logs/affiliate-clicks.log`.
- Log hiện lưu dạng JSON mỗi dòng: `{ productId, channel, ts }` và chỉ dùng cho mục đích development/demo.
- Trên production nên thay bằng hệ thống analytics (e.g., BigQuery, Segment, GA4 server-side) để bảo đảm privacy/retention policy.
- Nếu cần, mình có thể đổi `/api/track` để gửi events lên 3rd-party analytics hoặc queue vào SQS/kafka.
