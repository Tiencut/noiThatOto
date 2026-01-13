"""
Lazada crawler skeleton (safe placeholder).
Outputs: ./public/data/crawled/lazada.json
"""

import time
import json
import random
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / 'public' / 'data' / 'crawled' / 'lazada.json'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

def crawl_mock(limit=80):
    items = []
    for i in range(1, limit+1):
        items.append({
            'id': f'la_{i:04d}',
            'name': f'Vỏ vô lăng Lazada mẫu {i}',
            'platform': 'lazada',
            'price': random.randint(100000, 700000),
            'rating': round(4 + random.random(), 1),
            'url': f'https://lazada.vn/product/la_{i:04d}'
        })
        time.sleep(0.05)
    return items

if __name__ == '__main__':
    data = crawl_mock(80)
    with OUTPUT.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(data)} items to {OUTPUT}')
