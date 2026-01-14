const fs = require('fs');
const path = require('path');

const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'categories.json'), 'utf8'));

const carModels = ['Ranger', 'Hilux', 'CR-V', 'Camry', 'Innova', 'Swift', 'City', 'Civic', 'Kia Sorento', 'i10'];

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const products = [];
for (let i = 1; i <= 100; i++) {
    const categoryObj = pick(categories);
    const category = categoryObj.name;
    const model = pick(carModels);
    const id = `sp_${String(i).padStart(3, '0')}`;
    const basePrice = randInt(120000, 1200000);
    const shopee = Math.round(basePrice * (0.9 + Math.random() * 0.2));
    const lazada = Math.round(basePrice * (0.95 + Math.random() * 0.2));
    const tiktok = Math.round(basePrice * (0.9 + Math.random() * 0.3));
    const product = {
        id,
        name: `${category} cho ${model} - Mẫu ${i}`,
        category,
        carModels: [model],
        description: `${category} chất lượng, phù hợp cho ${model}. Mẫu nhẹ, dễ lắp.`,
        price: {
            shopee,
            lazada,
            tiktok,
            original: Math.round(basePrice * (1.2 + Math.random() * 0.5)),
            discount: `${randInt(5, 40)}%`
        },
        rating: {
            score: +((Math.random() * 1.2 + 4).toFixed(1)),
            count: randInt(10, 1500),
            reviews: ["Bền, lắp nhanh", "Chất lượng ổn", "Giá tốt"]
        },
        sales: {
            monthly: randInt(10, 5000),
            trend: Math.random() > 0.6 ? 'up' : 'stable'
        },
        image: {
            thumb: `https://source.unsplash.com/featured/?car,accessory,${encodeURIComponent(category)}`,
            full: `https://source.unsplash.com/1600x900/?car,accessory,${encodeURIComponent(category)}`,
            gallery: []
        },
        affiliate: {
            shopee: `https://shopee.vn/product/${id}`,
            lazada: `https://lazada.vn/product/${id}`,
            tiktok: `https://tiktok.com/product/${id}`
        },
        aiInfo: {
            fitVehicle: `✅ Fit ${model} (tham khảo chi tiết)`,
            material: `✅ Chất liệu bền`,
            installation: `✅ Lắp đơn giản, không cần khoan`,
            durability: `✅ Bền ~3 năm`,
            bestFor: `👌 Người cần tiện lợi`
        },
        specs: {
            weight: `${(Math.random()*3+0.5).toFixed(1)} kg`,
            material: 'Hợp chất tổng hợp',
            thickness: `${randInt(2,6)}mm`,
            waterproof: Math.random() > 0.3,
            odor_resistant: true,
            warranty: `${randInt(6,24)} tháng`
        },
        createdAt: '2026-01-13',
        updatedAt: '2026-01-13',
        tags: [model.toLowerCase(), category.replace(/\s+/g, '-').toLowerCase(), 'best-seller']
    };
    products.push(product);
}

function writeJSON(p, obj) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

writeJSON(path.join(__dirname, '..', 'public', 'data', 'products.json'), products);
writeJSON(path.join(__dirname, '..', 'public', 'data', 'categories.json'), categories);
writeJSON(path.join(__dirname, '..', 'public', 'data', 'car-models.json'), carModels);

console.log('Generated products.json (100 items)');