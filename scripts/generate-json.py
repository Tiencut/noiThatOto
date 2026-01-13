"""
Merge crawled data into `public/data/products.json`.
- Loads existing `public/data/products.json` (seed), then merges items from crawled files.
- New items will get ids prefixed with platform id and added/updated accordingly.
- Run: python scripts/generate-json.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public' / 'data'
CRAWLED = PUBLIC / 'crawled'
OUTPUT = PUBLIC / 'products.json'

def load_json(p: Path):
    if not p.exists():
        return []
    return json.loads(p.read_text(encoding='utf-8'))

if __name__ == '__main__':
    base = load_json(OUTPUT)
    base_by_id = {p['id']: p for p in base}

    for f in CRAWLED.glob('*.json'):
        items = load_json(f)
        for it in items:
            pid = it.get('id')
            # if exists, update price and url
            if pid in base_by_id:
                base_by_id[pid]['price'] = base_by_id[pid].get('price', {})
                base_by_id[pid]['price'][it['platform']] = it['price']
                base_by_id[pid]['affiliate'] = base_by_id[pid].get('affiliate', {})
                base_by_id[pid]['affiliate'][it['platform']] = it['url']
            else:
                # create a minimal product entry
                new = {
                    'id': pid,
                    'name': it.get('name'),
                    'category': 'Khác',
                    'carModels': [],
                    'description': it.get('name'),
                    'price': {it['platform']: it['price']},
                    'rating': {'score': it.get('rating', 4.0), 'count': 0, 'reviews': []},
                    'sales': {'monthly': 0, 'trend': 'stable'},
                    'image': {'thumb': '', 'full': '', 'gallery': []},
                    'affiliate': {it['platform']: it['url']},
                    'aiInfo': {},
                    'specs': {},
                    'createdAt': '',
                    'updatedAt': '',
                    'tags': []
                }
                base_by_id[pid] = new

    merged = list(base_by_id.values())
    OUTPUT.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Merged {len(merged)} products into {OUTPUT}')
