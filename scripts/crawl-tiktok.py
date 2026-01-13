"""
TikTok Shop crawler skeleton (placeholder).
Outputs: ./public/data/crawled/tiktok.json
"""

import time
import json
import random
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / 'public' / 'data' / 'crawled' / 'tiktok.json'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

def crawl_mock(limit=40):
    items = []
    for i in range(1, limit+1):
        items.append({
            'id': f'tt_{i:04d}',
            'name': f'Đèn nội thất TikTok mẫu {i}',
            'platform': 'tiktok',
            'price': random.randint(50000, 400000),
            'rating': round(4 + random.random(), 1),
            'url': f'https://tiktok.com/product/tt_{i:04d}'
        })
        time.sleep(0.05)
    return items

if __name__ == '__main__':
    data = crawl_mock(40)
    with OUTPUT.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(data)} items to {OUTPUT}')
