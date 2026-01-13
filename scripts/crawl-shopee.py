"""
Shopee crawler skeleton (safe placeholder).
- This script is a respectful scraper skeleton for internal/demo use only.
- **Do not** use it against live Shopee pages in production without checking TOS and using official APIs or affiliate partner APIs.

Outputs: ./public/data/crawled/shopee.json
"""

import time
import json
import random
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / 'public' / 'data' / 'crawled' / 'shopee.json'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

# Example function that would call the real API or scraper
# Here we only produce mock entries (for development) and show rate-limit handling

def crawl_mock(limit=50):
    items = []
    for i in range(1, limit+1):
        items.append({
            'id': f'sh_{i:04d}',
            'name': f'Thảm lót sàn Shopee mẫu {i}',
            'platform': 'shopee',
            'price': random.randint(80000, 800000),
            'rating': round(4 + random.random(), 1),
            'url': f'https://shopee.vn/product/sh_{i:04d}'
        })
        # Respectful delay to avoid hammering
        time.sleep(0.05)
    return items

if __name__ == '__main__':
    data = crawl_mock(100)
    with OUTPUT.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(data)} items to {OUTPUT}')
