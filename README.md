Dưới đây là **FULL Ý TƯỞNG DỰ ÁN: CarDecor Oto Affiliate** - Toàn bộ chi tiết, chưa cần làm web:

***

# 🚗 **CarDecor Oto Affiliate - FULL PROJECT PLAN**

## **I. TỔNG QUAN DỰ ÁN**

**Mục tiêu chính:**
Xây dựng app web giúp user tìm & mua phụ kiện trang trí nội thất ô tô chất lượng (best-seller), khắc phục vấn đề thiếu thông tin chi tiết bằng AI Gemini, tích hợp affiliate links Shopee + Lazada + TikTok Shop để sinh doanh thu.

**Giải quyết bài toán:**
- ❌ User mất time lựa chọn giữa hàng trăm sản phẩm giống nhau trên Shopee
- ✅ App chọn top 100 best-seller + AI bổ sung info thiếu (fit xe, chất liệu, dễ install)
- ✅ 1 click → so sánh giá 3 nền tảng (Shopee, Lazada, TikTok)

***

## **II. THÔNG SỐ DỰ ÁN**

| Tiêu chí | Chi tiết |
|----------|----------|
| **Platform Affiliate** | Shopee + Lazada + TikTok Shop (3 nền tảng phổ biến nhất VN) |
| **Model Xe Top 10** | Ranger, Hilux, CR-V, Camry, Innova, Swift, City, Civic, Kia Sorento, i10 |
| **8 Category Chính** | Thảm lót sàn, Vỏ vô lăng, Tựa đầu ghế, Lót cửa, Camera hành trình, Bảng điều khiển, Túi lưới hàng, Đèn nội thất |
| **Số Sản Phẩm Ban Đầu** | 100 sản phẩm (10-12/category, best-seller rating >4.5 sao) |
| **Tech Stack** | Next.js 15, React 19, Tailwind CSS, Supabase, Gemini API, Vercel |
| **Deploy** | Vercel (0đ), Domain: freenom/namecheap (50-150k/năm) |
| **Cập Nhật Lịch** | Hàng quý (1/1, 1/4, 1/7, 1/10) = 4 lần/năm |
| **Chi Phí Code** | 30h × 25k = 750k VNĐ (dùng Vibe Code + AI) |
| **Total Chi Phí** | ~800-900k VNĐ (chủ yếu code, hosting 0đ) |

***

## **III. STRUCTURE FOLDER CỤ THỂ**

```
cardecorator-app/
├── .github/workflows/
│   ├── deploy.yml                    # Auto deploy Vercel
│   └── data-update.yml               # Cron job update sản phẩm
├── public/
│   └── data/
│       ├── products.json             # 100 sản phẩm (generated)
│       ├── categories.json           # 8 loại
│       ├── car-models.json           # 10 xe
│       └── assets/
│           ├── cars/                 # Hình xe
│           └── products/             # Hình sản phẩm
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage
│   │   ├── products/page.tsx         # Danh sách sản phẩm (với filter)
│   │   ├── products/[id]/page.tsx    # Chi tiết sản phẩm
│   │   ├── car-models/page.tsx       # Chọn model xe
│   │   ├── car-models/[model]/page.tsx # Sản phẩm theo xe
│   │   ├── api/products/route.ts     # API GET sản phẩm
│   │   ├── api/recommend/route.ts    # API Gemini recommend
│   │   ├── api/filter/route.ts       # API filter
│   │   └── api/search/route.ts       # API search
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx            # Nav + search
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx           # Filter (car, category, price)
│   │   │   └── Breadcrumb.tsx
│   │   ├── Product/
│   │   │   ├── ProductCard.tsx       # 1 sản phẩm card
│   │   │   ├── ProductGrid.tsx       # Grid (responsive 2-4 col)
│   │   │   ├── ProductDetail.tsx     # Full details
│   │   │   ├── AffiliateLinks.tsx    # 3 buttons: Shopee, Lazada, TikTok
│   │   │   ├── AIInfo.tsx            # AI summarize box
│   │   │   ├── PriceCompare.tsx      # So sánh giá 3 nền tảng
│   │   │   └── Reviews.tsx           # Top reviews
│   │   ├── Filter/
│   │   │   ├── CarModelFilter.tsx    # Dropdown model xe
│   │   │   ├── CategoryFilter.tsx    # Multi-select loại
│   │   │   ├── PriceRangeSlider.tsx
│   │   │   ├── RatingFilter.tsx
│   │   │   └── SortBy.tsx
│   │   ├── Home/
│   │   │   ├── Hero.tsx              # Banner
│   │   │   ├── FeaturedProducts.tsx  # Top 10 best-seller
│   │   │   ├── CategoriesSection.tsx
│   │   │   └── CarModelsSection.tsx
│   │   ├── TikTok/
│   │   │   ├── TikTokEmbed.tsx       # Embed video TikTok
│   │   │   ├── TikTokAff.tsx         # Button TikTok Shop
│   │   │   └── TikTokFeed.tsx        # Video feed từ brand
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── Loading.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── shopee.ts             # Fetch Shopee API
│   │   │   ├── lazada.ts             # Fetch Lazada API
│   │   │   ├── tiktok.ts             # Fetch TikTok Shop API
│   │   │   ├── gemini.ts             # Gemini AI calls
│   │   │   └── crawler.ts            # Python wrapper
│   │   ├── utils/
│   │   │   ├── format.ts             # Format giá, ngày
│   │   │   ├── filter.ts             # Logic filter
│   │   │   ├── search.ts             # Search + highlight
│   │   │   └── tracking.ts           # Affiliate tracking (UTM)
│   │   ├── hooks/
│   │   │   ├── useProducts.ts        # Fetch + cache
│   │   │   ├── useFilter.ts          # Filter state
│   │   │   ├── useSearch.ts          # Search state
│   │   │   ├── useRecommend.ts       # Gemini recommend
│   │   │   └── useAffiliate.ts       # Track click
│   │   └── supabase.ts               # Client Supabase
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   └── types/
│       ├── product.ts
│       ├── category.ts
│       ├── carModel.ts
│       └── affiliate.ts
├── scripts/
│   ├── crawl-shopee.py               # Python crawl best-seller
│   ├── crawl-lazada.py
│   ├── crawl-tiktok.py
│   ├── generate-json.py              # Merge 3 sources → JSON
│   ├── gemini-enhance.py             # AI bổ sung thông tin
│   └── upload-supabase.py
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── .env.local
```

***

## **IV. JSON STRUCTURE - MỖI SẢN PHẨM**

```json
[
  {
    "id": "sp_001",
    "name": "Thảm lót sàn cao su Ford Ranger 2020+",
    "category": "Thảm lót sàn",
    "carModels": ["Ranger", "Ranger Wildtrak"],
    "description": "Thảm cao su chống nước, chống mùi, bền 5 năm",
    "price": {
      "shopee": 450000,
      "lazada": 480000,
      "tiktok": 460000,
      "original": 650000,
      "discount": "30%"
    },
    "rating": {
      "score": 4.8,
      "count": 324,
      "reviews": ["Bền, chống nước tốt", "Lắp dễ", "Mùa mưa không lo"]
    },
    "sales": {
      "monthly": 1250,
      "trend": "up"
    },
    "image": {
      "thumb": "https://...",
      "full": "https://...",
      "gallery": ["url1", "url2", "url3"]
    },
    "affiliate": {
      "shopee": "https://shopee.vn/...?af=xxxxx",
      "lazada": "https://lazada.vn/...?af=xxxxx",
      "tiktok": "https://shop.tiktok.com/...?af=xxxxx"
    },
    "aiInfo": {
      "fitVehicle": "✅ Fit hoàn hảo Ranger 2020+ (kích thước OEM)",
      "material": "✅ Cao su tổng hợp 5mm, chống UV, -30 đến +70°C",
      "installation": "✅ Lắp 10 phút, không cần khoan, có 4 miếng dán",
      "durability": "✅ Bền ~5 năm, dễ vệ sinh (rửa nước hoặc hút bụi)",
      "bestFor": "👌 Người hay chạy off-road, mùa mưa/bụi"
    },
    "specs": {
      "weight": "2.5 kg",
      "material": "Cao su tổng hợp",
      "thickness": "5mm",
      "waterproof": true,
      "odor_resistant": true,
      "warranty": "12 tháng"
    },
    "createdAt": "2025-01-13",
    "updatedAt": "2025-01-13",
    "tags": ["ranger", "tham-san", "chong-nuoc", "best-seller"]
  }
]
```

***

## **V. TÍNH NĂNG CHÍNH**

### **1. Filter Thông Minh**
- **Model Xe**: Dropdown 10 xe (Ranger, Hilux, CR-V...)
- **Loại Phụ Kiện**: Multi-select (Thảm sàn, Vỏ vô lăng, v.v)
- **Giá**: Slider min-max (0-3 triệu)
- **Rating**: >4.0, >4.5, >4.8 sao
- **Sort**: By sales, price (low-high), rating, new
- **Search**: Real-time tìm tên sản phẩm

### **2. AI Gemini Integration**
**Prompt Template:**
```
"Sản phẩm: [tên]. 
Bổ sung thông tin CHI TIẾT theo format JSON:
- fitVehicle: Fit loại xe nào? Kích thước? OEM hay universal?
- material: Chất liệu gì? Bền bao lâu?
- installation: Dễ lắp không? Cần tool?
- durability: Bảo hành? Bền mấy năm?
- bestFor: Ai nên mua? Ai nên skip?
Chỉ 2-3 dòng mỗi field, dễ hiểu cho user Việt."
```

### **3. So Sánh Giá Real-time**
- Hiển thị giá Shopee vs Lazada vs TikTok
- % discount từng nền tảng
- 1 click → mở affiliate link (có tracking UTM)

### **4. TikTok Integration**
- Embed video TikTok từ brand (ví dụ @cardecor hoặc shop TikTok)
- Link direct tới TikTok Shop affiliate
- Show video demo install (nếu có)
- Auto fetch video mới (tháng 1 lần)

### **5. Homepage Components**
- **Hero Banner**: "Chọn phụ kiện xe của bạn - Chuẩn OEM, Chính hãng"
- **Featured Products**: Top 10 best-seller (auto sort by sales)
- **Categories Section**: 8 loại phụ kiện (tiles interactive)
- **Car Models Selector**: Click model xe → products của xe đó
- **Testimonials**: Ảnh user + review tích cực

***

## **VI. AUTO-CRAWL SẢN PHẨM (Chi Tiết Kỹ Thuật)**

### **Script Python (chạy cron hàng quý - 1/1, 1/4, 1/7, 1/10)**

**File: `scripts/crawl-shopee.py`**
```python
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def crawl_shopee_bestseller():
    """Crawl Shopee top 50 best-seller 'nội thất ô tô'"""
    url = "https://shopee.vn/api/v4/search/search_items"
    params = {
        'keyword': 'nội thất ô tô',
        'by': 'sales',  # Sort best-seller
        'limit': 50,
        'offset': 0
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0..