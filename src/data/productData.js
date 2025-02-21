// Product categories
const categories = {
    SMARTPHONES: 'Smartphones',
    LAPTOPS: 'Laptops',
    ACCESSORIES: 'Accessories',
    AUDIO: 'Audio',
    GAMING: 'Gaming',
    WEARABLES: 'Wearables'
};

const brands = {
    smartphones: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'OPPO', 'Vivo', 'Huawei'],
    laptops: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Razer'],
    accessories: ['Anker', 'Belkin', 'Logitech', 'UGREEN', 'Spigen', 'AUKEY', 'RAVPower', 'Baseus'],
    audio: ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Apple', 'Samsung', 'Jabra', 'Audio-Technica'],
    gaming: ['Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX', 'ASUS ROG', 'MSI', 'NZXT'],
    wearables: ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Xiaomi', 'Huawei', 'OPPO', 'OnePlus']
};

const productTemplates = {
    smartphones: [
        '{brand} Smartphone Pro Max',
        '{brand} Phone Ultra',
        '{brand} Mobile Elite',
        '{brand} Smart Device Plus'
    ],
    laptops: [
        '{brand} Laptop Pro',
        '{brand} Notebook Elite',
        '{brand} UltraBook',
        '{brand} Gaming Laptop'
    ],
    accessories: [
        '{brand} Fast Charger',
        '{brand} USB-C Cable',
        '{brand} Power Bank',
        '{brand} Wireless Charger',
        '{brand} Phone Case',
        '{brand} Screen Protector',
        '{brand} Car Mount',
        '{brand} Desk Stand'
    ],
    audio: [
        '{brand} Wireless Earbuds',
        '{brand} Over-Ear Headphones',
        '{brand} Gaming Headset',
        '{brand} Bluetooth Speaker',
        '{brand} True Wireless Earphones',
        '{brand} Noise-Cancelling Headphones'
    ],
    gaming: [
        '{brand} Gaming Mouse',
        '{brand} Mechanical Keyboard',
        '{brand} Gaming Headset',
        '{brand} Gaming Controller',
        '{brand} RGB Mouse Pad',
        '{brand} Gaming Chair'
    ],
    wearables: [
        '{brand} Smartwatch Pro',
        '{brand} Fitness Tracker',
        '{brand} Smart Band',
        '{brand} Health Watch'
    ]
};

function getRandomPrice(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateDescription(category, brand, name) {
    const features = {
        smartphones: ['5G capable', '120Hz display', 'AI-powered camera', 'Fast charging', 'Water resistant'],
        laptops: ['SSD storage', 'High-performance CPU', 'Dedicated GPU', 'Long battery life', 'Premium build'],
        accessories: ['Fast charging', 'Durable design', 'Premium materials', 'Compact size', 'Universal compatibility'],
        audio: ['Active noise cancellation', 'Premium sound quality', 'Long battery life', 'Water resistant', 'Touch controls'],
        gaming: ['RGB lighting', 'Customizable buttons', 'Premium build quality', 'Ergonomic design', 'High precision'],
        wearables: ['Heart rate monitor', 'Sleep tracking', 'Water resistant', 'Long battery life', 'GPS enabled']
    };

    const randomFeatures = features[category].sort(() => 0.5 - Math.random()).slice(0, 3);
    return `${name} by ${brand}. Features include: ${randomFeatures.join(', ')}. Premium quality product designed for optimal performance.`;
}

function getImageUrl(category, index) {
    const demoImages = {
        smartphones: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&h=500&fit=crop'
        ],
        laptops: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop'
        ],
        accessories: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1608164415250-7d9a3cd0d3f8?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1625799406018-c558d83f5b51?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop'
        ],
        audio: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
        ],
        gaming: [
            'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&h=500&fit=crop'
        ],
        wearables: [
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop'
        ]
    };

    const images = demoImages[category.toLowerCase()] || demoImages.accessories;
    return images[index % images.length];
}

function generateProducts(count = 1000) {
    const products = [];
    const categoryList = Object.keys(productTemplates);

    for (let i = 0; i < count; i++) {
        const category = getRandomElement(categoryList);
        const brand = getRandomElement(brands[category]);
        const template = getRandomElement(productTemplates[category]);
        const name = template.replace('{brand}', brand);
        
        let price;
        switch (category) {
            case 'smartphones': price = getRandomPrice(299, 1499); break;
            case 'laptops': price = getRandomPrice(499, 2999); break;
            case 'accessories': price = getRandomPrice(9.99, 99.99); break;
            case 'audio': price = getRandomPrice(29.99, 399.99); break;
            case 'gaming': price = getRandomPrice(49.99, 499.99); break;
            case 'wearables': price = getRandomPrice(49.99, 699.99); break;
            default: price = getRandomPrice(29.99, 999.99);
        }

        products.push({
            id: i + 1,
            name,
            brand,
            category,
            price,
            description: generateDescription(category, brand, name),
            imgUrl: getImageUrl(category, i),
            rating: Number((3 + Math.random() * 2).toFixed(1)),
            stock: Math.floor(Math.random() * 100) + 1,
            createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
        });
    }

    return products;
}

export { categories as productCategories, brands as productBrands, generateProducts }; 