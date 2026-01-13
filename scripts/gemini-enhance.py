"""
Mock Gemini enhancement script. Reads products.json and fills aiInfo for items missing it.
Run: python scripts/gemini-enhance.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = ROOT / 'public' / 'data' / 'products.json'

if __name__ == '__main__':
    data = json.loads(PRODUCTS.read_text(encoding='utf-8'))
    for p in data:
        if not p.get('aiInfo') or p.get('aiInfo') == {}:
            p['aiInfo'] = {
                'fitVehicle': '✅ Fit thông thường, kiểm tra mô tả',
                'material': '✅ Chất liệu bền',
                'installation': '✅ Lắp đơn giản, không cần công cụ',
                'durability': '✅ Bền trung bình 2-5 năm',
                'bestFor': '👌 Người cần tiện lợi'
            }
    PRODUCTS.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Enhanced products with AI info')
