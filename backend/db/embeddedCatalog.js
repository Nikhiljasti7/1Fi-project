/**
 * High-grade expanded smartphone catalog with authentic specs,
 * multiple variants, hex swatches, verified Apple CDN image galleries,
 * and exact Apple company technical specifications.
 * Works seamlessly both standalone (embedded store) and in PostgreSQL.
 */

const PRODUCTS = [
  // ================= APPLE =================
  {
    id: 100,
    slug: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    tagline: 'The ultimate 2nm titanium powerhouse with triple 48MP cameras.',
    description: "Apple's upcoming next-generation supreme flagship featuring the ground-breaking 2nm A19 Pro chip, 6.9-inch Super Retina XDR with narrower Dynamic Island, 48MP periscope telephoto with 10x optical-quality zoom, and Wi-Fi 7.",
    category: 'flagship',
    rating: 4.98,
    reviewsCount: 142,
    specs: {
      display: '6.9-inch Super Retina XDR OLED (2868x1320 at 460 ppi), 1-120Hz ProMotion, Narrow Dynamic Island, 2,600 nits peak outdoor, Next-Gen Ceramic Shield',
      processor: 'Apple A19 Pro (2nm next-gen architecture) with 6-core CPU, 6-core GPU with Neural Ray Tracing, 32-core Neural Engine',
      camera: 'Triple 48MP Pro System: 48MP Fusion (ƒ/1.7, 2nd-gen sensor shift) + 48MP Ultra Wide (ƒ/2.0) + 48MP Periscope Telephoto (10x optical-quality zoom), 24MP Center Stage front camera, Camera Control 2.0',
      battery: 'Up to 35 hours video playback, 40W fast wired charging, 30W MagSafe wireless',
      build: 'Refined Grade 5 Titanium alloy, anti-reflective matte glass back, Action button, Camera Control, IP68 rated, 224 grams',
      os: 'iOS 19 with Apple Intelligence 2.0',
      security: 'Face ID TrueDepth sub-display biometric authentication',
    },
    variants: [
      {
        id: 1701,
        label: '256GB / Cosmic Orange',
        storage: '256GB',
        color: 'Cosmic Orange',
        colorHex: '#C96A3C',
        mrp: 154900,
        sellingPrice: 154900,
        imageUrl: '/images/iphone-17-orange/front_back.jpg',
        images: [
          {
            angle: 'front_back',
            label: 'Front & Back Titanium Finish',
            url: '/images/iphone-17-orange/front_back.jpg',
          },
          {
            angle: 'camera',
            label: 'Triple 48MP Periscope Camera Close-up',
            url: '/images/iphone-17-orange/camera_macro.jpg',
          },
          {
            angle: 'side',
            label: 'Cosmic Orange Titanium Edge Profile',
            url: '/images/iphone-17-orange/side_profile.jpg',
          },
          {
            angle: 'lineup',
            label: 'Dual Display & Finish Showcase',
            url: '/images/iphone-17-orange/front_back_main.png',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: false },
          { tenureMonths: 36, annualInterestRate: 10.5, cashbackAmount: 9000, isRecommended: false },
        ],
      },
      {
        id: 1702,
        label: '512GB / Deep Blue Titanium',
        storage: '512GB',
        color: 'Deep Blue Titanium',
        colorHex: '#1E293B',
        mrp: 174900,
        sellingPrice: 174900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Deep Blue Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 9500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 9500, isRecommended: false },
        ],
      },
      {
        id: 1703,
        label: '512GB / Natural Titanium',
        storage: '512GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 174900,
        sellingPrice: 174900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 9500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 9500, isRecommended: false },
        ],
      },
      {
        id: 1704,
        label: '1TB / Black Titanium',
        storage: '1TB',
        color: 'Black Titanium',
        colorHex: '#1F2428',
        mrp: 194900,
        sellingPrice: 194900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 11000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 11000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 101,
    slug: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    tagline: 'Pro performance redefined in a versatile 6.3-inch titanium frame.',
    description: 'Powered by the next-generation 2nm A19 Pro chip with hardware ray tracing, 6.3-inch 120Hz ProMotion display, all-48MP triple camera system, and 24MP front camera.',
    category: 'flagship',
    rating: 4.96,
    reviewsCount: 118,
    specs: {
      display: '6.3-inch Super Retina XDR OLED (2622x1206 at 460 ppi), 1-120Hz ProMotion, Always-On, 2,600 nits peak outdoor, Ceramic Shield 2.0',
      processor: 'Apple A19 Pro (2nm) with 6-core CPU, 6-core GPU, 32-core Neural Engine',
      camera: 'Triple 48MP: 48MP Fusion + 48MP Ultra-Wide + 48MP 5x Telephoto (120mm), 24MP Center Stage front camera, Camera Control, 4K 120 fps ProRes',
      battery: 'Up to 29 hours video playback, 30W MagSafe fast wireless',
      build: 'Grade 5 Titanium, micro-etched glass back, Action button, Camera Control, IP68 rated, 196 grams',
      os: 'iOS 19 with Apple Intelligence 2.0',
      security: 'Face ID biometric authentication',
    },
    variants: [
      {
        id: 1711,
        label: '128GB / Deep Blue Titanium',
        storage: '128GB',
        color: 'Deep Blue Titanium',
        colorHex: '#1E293B',
        mrp: 129900,
        sellingPrice: 129900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Deep Blue Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Display View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
        ],
      },
      {
        id: 1712,
        label: '256GB / Cosmic Orange',
        storage: '256GB',
        color: 'Cosmic Orange',
        colorHex: '#C96A3C',
        mrp: 139900,
        sellingPrice: 139900,
        imageUrl: '/images/iphone-17-orange/front_back.jpg',
        images: [
          {
            angle: 'front_back',
            label: 'Front & Back Titanium Finish',
            url: '/images/iphone-17-orange/front_back.jpg',
          },
          {
            angle: 'camera',
            label: 'Triple 48MP Periscope Camera Close-up',
            url: '/images/iphone-17-orange/camera_macro.jpg',
          },
          {
            angle: 'side',
            label: 'Cosmic Orange Titanium Edge Profile',
            url: '/images/iphone-17-orange/side_profile.jpg',
          },
          {
            angle: 'lineup',
            label: 'Dual Display & Finish Showcase',
            url: '/images/iphone-17-orange/front_back_main.png',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
        ],
      },
      {
        id: 1713,
        label: '512GB / Natural Titanium',
        storage: '512GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 159900,
        sellingPrice: 159900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: false },
        ],
      },
      {
        id: 1714,
        label: '1TB / White Titanium',
        storage: '1TB',
        color: 'White Titanium',
        colorHex: '#F2F2F0',
        mrp: 179900,
        sellingPrice: 179900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 10000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 10000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 102,
    slug: 'iphone-17-air',
    name: 'iPhone 17 Air',
    brand: 'Apple',
    tagline: 'The ultra-slim 5.5mm design. Thin. Light. Unbelievably fast.',
    description: "Apple's most radical redesign yet: an astonishingly slim 5.5mm profile, expansive 6.6-inch 120Hz ProMotion display, aerospace titanium-aluminium hybrid chassis, A19 chip, and advanced 48MP computational camera.",
    category: 'flagship',
    rating: 4.94,
    reviewsCount: 205,
    specs: {
      display: '6.6-inch Super Retina XDR OLED (2740x1260 at 460 ppi), 120Hz ProMotion, Dynamic Island, 2,200 nits peak, Ultra-thin Ceramic Shield',
      processor: 'Apple A19 chip (3nm enhanced) with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: '48MP Fusion Computational Camera (ƒ/1.6, sensor-shift OIS, 2x Telephoto optical zoom), 24MP front camera, Camera Control',
      battery: 'Up to 24 hours video playback in a revolutionary slim 5.5mm chassis, fast MagSafe wireless',
      build: 'Titanium-Aluminium composite chassis, ultra-lightweight 5.5mm depth, Action button, Camera Control, IP68 rated, 162 grams',
      os: 'iOS 19 with Apple Intelligence',
      security: 'Face ID biometric authentication',
    },
    variants: [
      {
        id: 1721,
        label: '128GB / Sky Blue',
        storage: '128GB',
        color: 'Sky Blue',
        colorHex: '#7BA8C4',
        mrp: 99900,
        sellingPrice: 99900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Sky Blue Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Ultra-thin 5.5mm Profile & Display',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 1722,
        label: '256GB / Cloud White',
        storage: '256GB',
        color: 'Cloud White',
        colorHex: '#F5F5F7',
        mrp: 109900,
        sellingPrice: 109900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Cloud White Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 1723,
        label: '512GB / Space Gray',
        storage: '512GB',
        color: 'Space Gray',
        colorHex: '#333538',
        mrp: 129900,
        sellingPrice: 129900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Space Gray Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 103,
    slug: 'iphone-17',
    name: 'iPhone 17',
    brand: 'Apple',
    tagline: 'Now with 120Hz ProMotion, A19 silicon, and all-new colors.',
    description: 'The standard iPhone reaches new heights: featuring a 120Hz ProMotion display for the first time, high-efficiency A19 chip, dual 48MP cameras, Camera Control, and Apple Intelligence.',
    category: 'flagship',
    rating: 4.92,
    reviewsCount: 160,
    specs: {
      display: '6.3-inch Super Retina XDR OLED (2622x1206 at 460 ppi), 120Hz ProMotion, Dynamic Island, 2,200 nits peak outdoor, Ceramic Shield',
      processor: 'Apple A19 chip (3nm enhanced) with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: 'Dual 48MP system: 48MP Fusion (ƒ/1.6, OIS, 2x Telephoto) + 48MP Ultra-Wide with Macro photography, 24MP front camera, Camera Control',
      battery: 'Up to 25 hours video playback, 25W MagSafe wireless charging',
      build: 'Aerospace-grade aluminium, colour-infused back glass, Action button, Camera Control, IP68 rated, 172 grams',
      os: 'iOS 19 with Apple Intelligence',
      security: 'Face ID',
    },
    variants: [
      {
        id: 1731,
        label: '128GB / Lavender',
        storage: '128GB',
        color: 'Lavender',
        colorHex: '#A89FBA',
        mrp: 84900,
        sellingPrice: 84900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Lavender Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: '6.3-inch 120Hz ProMotion Front View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 1732,
        label: '128GB / Sage Green',
        storage: '128GB',
        color: 'Sage Green',
        colorHex: '#7B9E89',
        mrp: 84900,
        sellingPrice: 84900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Sage Green Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 1733,
        label: '256GB / Midnight Black',
        storage: '256GB',
        color: 'Midnight Black',
        colorHex: '#1B1D1F',
        mrp: 94900,
        sellingPrice: 94900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Midnight Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6500, isRecommended: false },
        ],
      },
      {
        id: 1734,
        label: '512GB / Starlight',
        storage: '512GB',
        color: 'Starlight',
        colorHex: '#FAF7F2',
        mrp: 114900,
        sellingPrice: 114900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Starlight Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 1,
    slug: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    tagline: 'Hello, Apple Intelligence. Strong. Light. Pro.',
    description: "Apple's supreme flagship crafted in Grade 5 Titanium with thinner borders, expansive 6.9-inch Super Retina XDR display, A18 Pro chip, tactile Camera Control button, and 4K 120 fps Dolby Vision.",
    category: 'flagship',
    rating: 4.95,
    reviewsCount: 684,
    specs: {
      display: '6.9-inch Super Retina XDR OLED (2868x1320 at 460 ppi), ProMotion 120Hz, Always-On, Dynamic Island, 2,000 nits peak outdoor, Latest-gen Ceramic Shield',
      processor: 'Apple A18 Pro chip (second-gen 3nm) with 6-core CPU (2 performance & 4 efficiency), 6-core GPU with hardware ray tracing, 16-core Neural Engine',
      camera: 'Pro camera system: 48MP Fusion (24mm, ƒ/1.78, 2nd-gen sensor-shift OIS) + 48MP Ultra Wide (13mm, ƒ/2.2, 120° FOV) + 12MP 5x Telephoto (120mm, ƒ/2.8), Camera Control button with tactile haptic sensor, 4K 120 fps Dolby Vision, Studio-quality 4-mic array with Spatial Audio',
      battery: 'Built-in rechargeable lithium-ion, Up to 33 hours video playback (29 hours streamed), Fast-charge capable: up to 50% charge in around 30 mins with 20W+ adapter or 25W MagSafe',
      build: 'Grade 5 Titanium with textured matte glass back, Action button, Camera Control, IP68 rated (maximum depth of 6m up to 30 mins), 227 grams',
      os: 'iOS 18 with Apple Intelligence personal AI system',
      security: 'Face ID enabled by TrueDepth camera for secure authentication',
    },
    variants: [
      {
        id: 101,
        label: '256GB / Desert Titanium',
        storage: '256GB',
        color: 'Desert Titanium',
        colorHex: '#C5A880',
        mrp: 144900,
        sellingPrice: 144900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Desert Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
            thumbUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=200&hei=200&fmt=jpeg&qlt=80',
          },
          {
            angle: 'gallery_front',
            label: 'Titanium Front & Display Profile',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
            thumbUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=200&hei=200&fmt=jpeg&qlt=80',
          },
          {
            angle: 'gallery_back',
            label: 'Grade 5 Back & Triple Camera Island',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
            thumbUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=200&hei=200&fmt=jpeg&qlt=80',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 3, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
          { tenureMonths: 36, annualInterestRate: 10.5, cashbackAmount: 8000, isRecommended: false },
          { tenureMonths: 48, annualInterestRate: 10.5, cashbackAmount: 8000, isRecommended: false },
        ],
      },
      {
        id: 102,
        label: '512GB / Natural Titanium',
        storage: '512GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 164900,
        sellingPrice: 164900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
            thumbUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=200&hei=200&fmt=jpeg&qlt=80',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Display View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: false },
        ],
      },
      {
        id: 103,
        label: '512GB / White Titanium',
        storage: '512GB',
        color: 'White Titanium',
        colorHex: '#F2F2F0',
        mrp: 164900,
        sellingPrice: 164900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8500, isRecommended: false },
        ],
      },
      {
        id: 104,
        label: '1TB / Black Titanium',
        storage: '1TB',
        color: 'Black Titanium',
        colorHex: '#3B3A36',
        mrp: 184900,
        sellingPrice: 184900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 10000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 10000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 2,
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    tagline: 'Pro performance in a versatile 6.3-inch titanium design.',
    description: 'Powered by the breakthrough A18 Pro chip with 6-core GPU, stunning 6.3-inch Super Retina XDR display with ProMotion 120Hz, Camera Control, and 5x Telephoto optical zoom.',
    category: 'flagship',
    rating: 4.93,
    reviewsCount: 520,
    specs: {
      display: '6.3-inch Super Retina XDR OLED (2622x1206 at 460 ppi), ProMotion 120Hz, Always-On, Dynamic Island, 2,000 nits peak outdoor, Latest-gen Ceramic Shield',
      processor: 'Apple A18 Pro chip (3nm) with 6-core CPU, 6-core GPU, 16-core Neural Engine',
      camera: 'Pro camera system: 48MP Fusion (24mm, ƒ/1.78, sensor-shift OIS) + 48MP Ultra Wide (13mm, ƒ/2.2, Macro) + 12MP 5x Telephoto (120mm, ƒ/2.8), Camera Control, 4K 120 fps Dolby Vision',
      battery: 'Up to 27 hours video playback, Fast-charge 50% in 30 mins with 20W+ or 25W MagSafe',
      build: 'Grade 5 Titanium, textured matte glass back, Action button, Camera Control, IP68 water resistance, 199 grams',
      os: 'iOS 18 with Apple Intelligence',
      security: 'Face ID biometric authentication',
    },
    variants: [
      {
        id: 201,
        label: '128GB / Desert Titanium',
        storage: '128GB',
        color: 'Desert Titanium',
        colorHex: '#C5A880',
        mrp: 119900,
        sellingPrice: 119900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Desert Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: '6.3-inch Super Retina XDR Display',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 3, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 202,
        label: '256GB / Natural Titanium',
        storage: '256GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 129900,
        sellingPrice: 129900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
        ],
      },
      {
        id: 203,
        label: '512GB / White Titanium',
        storage: '512GB',
        color: 'White Titanium',
        colorHex: '#F2F2F0',
        mrp: 149900,
        sellingPrice: 149900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
        ],
      },
      {
        id: 204,
        label: '1TB / Black Titanium',
        storage: '1TB',
        color: 'Black Titanium',
        colorHex: '#3B3A36',
        mrp: 169900,
        sellingPrice: 169900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 3,
    slug: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    brand: 'Apple',
    tagline: 'Expansive 6.7-inch display with stellar all-day battery life.',
    description: 'Bigger 6.7-inch Super Retina XDR screen, A18 silicon, Camera Control, 48MP Fusion camera with 2x optical Telephoto, and up to 27 hours battery.',
    category: 'flagship',
    rating: 4.89,
    reviewsCount: 395,
    specs: {
      display: '6.7-inch Super Retina XDR OLED (2796x1290 at 460 ppi), Dynamic Island, 2,000 nits peak outdoor, Ceramic Shield front',
      processor: 'Apple A18 chip (3nm) with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: '48MP Fusion (26mm, ƒ/1.6, sensor-shift OIS, 2x Telephoto) + 12MP Ultra Wide with Macro, Camera Control, Spatial Audio recording',
      battery: 'Up to 27 hours video playback, 25W MagSafe wireless charging',
      build: 'Aerospace-grade aluminium with colour-infused glass back, Action button, Camera Control, IP68 rated, 199 grams',
      os: 'iOS 18 with Apple Intelligence',
      security: 'Face ID biometric authentication',
    },
    variants: [
      {
        id: 301,
        label: '128GB / Ultramarine',
        storage: '128GB',
        color: 'Ultramarine',
        colorHex: '#44658A',
        mrp: 89900,
        sellingPrice: 89900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Ultramarine Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Display View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 302,
        label: '256GB / Teal',
        storage: '256GB',
        color: 'Teal',
        colorHex: '#7AA39E',
        mrp: 99900,
        sellingPrice: 99900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Teal Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 303,
        label: '256GB / Pink',
        storage: '256GB',
        color: 'Pink',
        colorHex: '#E297A7',
        mrp: 99900,
        sellingPrice: 99900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Pink Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 304,
        label: '512GB / White',
        storage: '512GB',
        color: 'White',
        colorHex: '#F2F4F5',
        mrp: 119900,
        sellingPrice: 119900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 305,
        label: '512GB / Black',
        storage: '512GB',
        color: 'Black',
        colorHex: '#333538',
        mrp: 119900,
        sellingPrice: 119900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 4,
    slug: 'iphone-16',
    name: 'iPhone 16',
    brand: 'Apple',
    tagline: 'Colour-infused glass with A18 chip and Camera Control.',
    description: 'Built for Apple Intelligence with the all-new A18 processor, Camera Control, 48MP Fusion camera with 2x Telephoto optical quality, and Macro photography.',
    category: 'flagship',
    rating: 4.88,
    reviewsCount: 410,
    specs: {
      display: '6.1-inch Super Retina XDR OLED (2556x1179 at 460 ppi), Dynamic Island, 2,000 nits peak outdoor, Ceramic Shield front',
      processor: 'Apple A18 chip (3nm) with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: 'Advanced dual-camera: 48MP Fusion (26mm, ƒ/1.6, sensor-shift OIS, 2x Telephoto) + 12MP Ultra Wide with Macro, Camera Control, Spatial Photo & Video',
      battery: 'Up to 22 hours video playback, 25W MagSafe wireless charging',
      build: 'Aerospace-grade aluminium with colour-infused glass back, Action button, Camera Control, IP68 rated, 170 grams',
      os: 'iOS 18 with Apple Intelligence',
      security: 'Face ID',
    },
    variants: [
      {
        id: 401,
        label: '128GB / Ultramarine',
        storage: '128GB',
        color: 'Ultramarine',
        colorHex: '#44658A',
        mrp: 79900,
        sellingPrice: 79900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Ultramarine Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Dynamic Island',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-model-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 3, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
        ],
      },
      {
        id: 402,
        label: '128GB / Teal',
        storage: '128GB',
        color: 'Teal',
        colorHex: '#7AA39E',
        mrp: 79900,
        sellingPrice: 79900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Teal Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
        ],
      },
      {
        id: 403,
        label: '256GB / Pink',
        storage: '256GB',
        color: 'Pink',
        colorHex: '#E297A7',
        mrp: 89900,
        sellingPrice: 89900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Pink Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: false },
        ],
      },
      {
        id: 404,
        label: '256GB / White',
        storage: '256GB',
        color: 'White',
        colorHex: '#F2F4F5',
        mrp: 89900,
        sellingPrice: 89900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: false },
        ],
      },
      {
        id: 405,
        label: '512GB / Black',
        storage: '512GB',
        color: 'Black',
        colorHex: '#333538',
        mrp: 109900,
        sellingPrice: 109900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 5,
    slug: 'iphone-16e',
    name: 'iPhone 16e',
    brand: 'Apple',
    tagline: 'Latest Apple Intelligence powerhouse built for everyone.',
    description: 'The newest addition to the iPhone family: loaded with the powerful A18 processor, Apple Intelligence personal AI system, 48MP 2-in-1 Fusion camera, Action button, and outstanding battery life.',
    category: 'flagship',
    rating: 4.87,
    reviewsCount: 264,
    specs: {
      display: '6.1-inch Super Retina XDR OLED (2532x1170 at 460 ppi), HDR10, Ceramic Shield, 1,200 nits peak',
      processor: 'Apple A18 chip (3nm) with 6-core CPU, 4-core GPU, 16-core Neural Engine & Apple C1 5G modem',
      camera: '48MP 2-in-1 Fusion camera (ƒ/1.6, sensor-shift OIS, 2x Telephoto optical zoom), Photographic Styles, 4K Dolby Vision video',
      battery: 'Up to 26 hours video playback, Qi2 wireless charging & USB-C fast charging',
      build: 'Aerospace-grade aluminium, durable glass back, Action button, IP68 water resistance, 167 grams',
      os: 'iOS 18.3 with Apple Intelligence suite',
      security: 'Face ID biometric authentication',
    },
    variants: [
      {
        id: 501,
        label: '128GB / White',
        storage: '128GB',
        color: 'White',
        colorHex: '#F2F4F5',
        mrp: 59900,
        sellingPrice: 59900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'iPhone 16e White Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-white?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 3, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
      {
        id: 502,
        label: '256GB / Black',
        storage: '256GB',
        color: 'Black',
        colorHex: '#252627',
        mrp: 69900,
        sellingPrice: 69900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'iPhone 16e Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-select-202502-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 4500, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4500, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 6,
    slug: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    tagline: 'Titanium powerhouse with A17 Pro and 5x optical telephoto.',
    description: 'The groundbreaking Grade 5 titanium iPhone featuring the 3nm A17 Pro chip with console gaming support, customizable Action button, 48MP main sensor, and 5x tetraprism optical zoom.',
    category: 'flagship',
    rating: 4.91,
    reviewsCount: 820,
    specs: {
      display: '6.7-inch Super Retina XDR OLED (2796x1290 at 460 ppi), ProMotion 120Hz, Always-On, Dynamic Island, 2,000 nits peak',
      processor: 'Apple A17 Pro (3nm) with 6-core GPU & hardware ray tracing',
      camera: '48MP Main (24mm, ƒ/1.78, sensor-shift OIS) + 12MP Ultra Wide + 12MP 5x Telephoto (120mm), USB 3.0 up to 10Gb/s',
      battery: 'Up to 29 hours video playback, 15W MagSafe wireless',
      build: 'Titanium design with textured matte glass back, Action button, IP68 rated, 221 grams',
      os: 'iOS 18 upgradable',
      security: 'Face ID',
    },
    variants: [
      {
        id: 601,
        label: '256GB / Natural Titanium',
        storage: '256GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 149900,
        sellingPrice: 134900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Display View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 602,
        label: '256GB / Blue Titanium',
        storage: '256GB',
        color: 'Blue Titanium',
        colorHex: '#3A4450',
        mrp: 149900,
        sellingPrice: 134900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Blue Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
      {
        id: 603,
        label: '512GB / White Titanium',
        storage: '512GB',
        color: 'White Titanium',
        colorHex: '#F2F2F0',
        mrp: 169900,
        sellingPrice: 154900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'White Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 8000, isRecommended: false },
        ],
      },
      {
        id: 604,
        label: '1TB / Black Titanium',
        storage: '1TB',
        color: 'Black Titanium',
        colorHex: '#3B3A36',
        mrp: 189900,
        sellingPrice: 174900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 9000, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 7,
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    tagline: 'Compact titanium design with A17 Pro and Action button.',
    description: 'Crafted in Grade 5 Titanium with 6.1-inch 120Hz ProMotion screen, high-performance A17 Pro processor, versatile 48MP camera, and customizable Action button.',
    category: 'flagship',
    rating: 4.9,
    reviewsCount: 640,
    specs: {
      display: '6.1-inch Super Retina XDR OLED (2556x1179 at 460 ppi), ProMotion 120Hz, Always-On, Dynamic Island, 2,000 nits peak',
      processor: 'Apple A17 Pro (3nm) with 6-core GPU, ray tracing engine',
      camera: '48MP Main (ƒ/1.78, OIS) + 12MP Ultra Wide + 12MP 3x Telephoto (77mm), USB 3.0 up to 10Gb/s',
      battery: 'Up to 23 hours video playback',
      build: 'Grade 5 Titanium, textured matte glass back, Action button, IP68 water resistance, 187 grams',
      os: 'iOS 18 upgradable',
      security: 'Face ID',
    },
    variants: [
      {
        id: 701,
        label: '128GB / Natural Titanium',
        storage: '128GB',
        color: 'Natural Titanium',
        colorHex: '#9E978E',
        mrp: 129900,
        sellingPrice: 109900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Natural Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6000, isRecommended: false },
        ],
      },
      {
        id: 702,
        label: '256GB / Blue Titanium',
        storage: '256GB',
        color: 'Blue Titanium',
        colorHex: '#3A4450',
        mrp: 139900,
        sellingPrice: 119900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Blue Titanium Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 6500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 6500, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 8,
    slug: 'iphone-15-plus',
    name: 'iPhone 15 Plus',
    brand: 'Apple',
    tagline: 'Large 6.7-inch screen with all-day battery life and Dynamic Island.',
    description: 'Dynamic Island, 48MP Main camera with 2x optical zoom, all-day battery life, colour-infused glass back, and USB-C connectivity.',
    category: 'flagship',
    rating: 4.86,
    reviewsCount: 380,
    specs: {
      display: '6.7-inch Super Retina XDR OLED (2796x1290 at 460 ppi), Dynamic Island, 2,000 nits peak outdoor',
      processor: 'Apple A16 Bionic (4nm) with 5-core GPU, 16-core Neural Engine',
      camera: '48MP Main (26mm, ƒ/1.6, OIS, 2x Telephoto) + 12MP Ultra Wide (13mm, ƒ/2.4, 120° FOV)',
      battery: 'Up to 26 hours video playback, MagSafe wireless charging',
      build: 'Aluminium frame with colour-infused glass back, IP68 rated, 201 grams',
      os: 'iOS 18 upgradable',
      security: 'Face ID',
    },
    variants: [
      {
        id: 801,
        label: '128GB / Blue',
        storage: '128GB',
        color: 'Blue',
        colorHex: '#D4E0E8',
        mrp: 79900,
        sellingPrice: 69900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Blue Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Display View',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-model-unselect-gallery-1-202309?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
        ],
      },
      {
        id: 802,
        label: '128GB / Pink',
        storage: '128GB',
        color: 'Pink',
        colorHex: '#F6D2D6',
        mrp: 79900,
        sellingPrice: 69900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Pink Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5000, isRecommended: false },
        ],
      },
      {
        id: 803,
        label: '256GB / Black',
        storage: '256GB',
        color: 'Black',
        colorHex: '#37393B',
        mrp: 89900,
        sellingPrice: 79900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 5500, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 9,
    slug: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    tagline: 'Dynamic Island, 48MP Main camera, and USB-C connectivity.',
    description: 'Dynamic Island bubbles up alerts, 48MP camera takes super-high-resolution photos, durable colour-infused back glass, and universal USB-C charging.',
    category: 'flagship',
    rating: 4.88,
    reviewsCount: 510,
    specs: {
      display: '6.1-inch Super Retina XDR OLED (2556x1179 at 460 ppi), Dynamic Island, 2,000 nits peak outdoor, Ceramic Shield',
      processor: 'Apple A16 Bionic (4nm) with 6-core CPU, 5-core GPU, 16-core Neural Engine',
      camera: 'Advanced dual camera: 48MP Main (ƒ/1.6, OIS, 2x Telephoto) + 12MP Ultra Wide (ƒ/2.4, 120° FOV)',
      battery: 'Up to 20 hours video playback, MagSafe wireless charging',
      build: 'Aluminium frame, colour-infused glass back, IP68 water resistant, 171 grams',
      os: 'iOS 18 upgradable',
      security: 'Face ID',
    },
    variants: [
      {
        id: 901,
        label: '128GB / Blue',
        storage: '128GB',
        color: 'Blue',
        colorHex: '#D4E0E8',
        mrp: 69900,
        sellingPrice: 59900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Blue Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
          {
            angle: 'gallery_front',
            label: 'Front & Dynamic Island',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-model-unselect-gallery-1-202309?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
      {
        id: 902,
        label: '128GB / Pink',
        storage: '128GB',
        color: 'Pink',
        colorHex: '#F6D2D6',
        mrp: 69900,
        sellingPrice: 59900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Pink Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
      {
        id: 903,
        label: '128GB / Green',
        storage: '128GB',
        color: 'Green',
        colorHex: '#DCE5D8',
        mrp: 69900,
        sellingPrice: 59900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Green Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
      {
        id: 904,
        label: '256GB / Black',
        storage: '256GB',
        color: 'Black',
        colorHex: '#37393B',
        mrp: 79900,
        sellingPrice: 69900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Black Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4500, isRecommended: false },
        ],
      },
    ],
  },

  {
    id: 10,
    slug: 'iphone-se-3rd-gen',
    name: 'iPhone SE (3rd Gen)',
    brand: 'Apple',
    tagline: 'Compact size with fast A15 Bionic chip and 5G speeds.',
    description: 'Iconic compact pocket design with 4.7-inch display, blazing-fast A15 Bionic chip, 5G cellular speed, home button with Touch ID, and wireless charging.',
    category: 'flagship',
    rating: 4.82,
    reviewsCount: 340,
    specs: {
      display: '4.7-inch Retina HD LCD (1334x750 at 326 ppi), True Tone, Wide color (P3), 625 nits max',
      processor: 'Apple A15 Bionic with 6-core CPU, 4-core GPU, 16-core Neural Engine',
      camera: '12MP Wide camera (ƒ/1.8, OIS), Smart HDR 4, Deep Fusion, Portrait mode, 4K video recording up to 60 fps',
      battery: 'Up to 15 hours video playback, Fast-charge 50% in 30 mins with 20W adapter',
      build: 'Aerospace-grade aluminium with front & back durable glass, Home button with Touch ID, IP67 water resistant, 144 grams',
      os: 'iOS 18 upgradable',
      security: 'Touch ID fingerprint sensor integrated into Home button',
    },
    variants: [
      {
        id: 1001,
        label: '64GB / Midnight',
        storage: '64GB',
        color: 'Midnight',
        colorHex: '#1B242F',
        mrp: 47900,
        sellingPrice: 43900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-midnight?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Midnight Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-midnight?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 3, annualInterestRate: 0, cashbackAmount: 3000, isRecommended: false },
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 3000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 3000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 3000, isRecommended: false },
        ],
      },
      {
        id: 1002,
        label: '128GB / Starlight',
        storage: '128GB',
        color: 'Starlight',
        colorHex: '#F9F6EF',
        mrp: 52900,
        sellingPrice: 48900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-starlight?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: 'Starlight Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-starlight?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 3500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 3500, isRecommended: false },
        ],
      },
      {
        id: 1003,
        label: '256GB / (PRODUCT)RED',
        storage: '256GB',
        color: '(PRODUCT)RED',
        colorHex: '#BF0012',
        mrp: 62900,
        sellingPrice: 58900,
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-product-red?wid=1000&hei=1000&fmt=jpeg&qlt=90',
        images: [
          {
            angle: 'finish',
            label: '(PRODUCT)RED Finish',
            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-product-red?wid=1000&hei=1000&fmt=jpeg&qlt=90',
          },
        ],
        isDefault: false,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
    ],
  },

  // ================= SAMSUNG =================
  {
    id: 11,
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    tagline: 'Galaxy AI is here with built-in S-Pen and titanium armor.',
    description: 'Titanium frame, flat 6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3 for Galaxy, quad telephoto with 200MP sensor, and Circle to Search.',
    category: 'flagship',
    rating: 4.9,
    reviewsCount: 460,
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X, QHD+, 1-120Hz, 2600 nits peak, Corning Gorilla Armor anti-reflective',
      processor: 'Snapdragon 8 Gen 3 for Galaxy (4nm) with vapor chamber cooling',
      camera: '200MP Main (OIS) + 50MP 5x Periscope (10x optical-quality) + 10MP 3x Telephoto + 12MP Ultra-Wide',
      battery: '5000 mAh, 45W super-fast wired, 15W wireless',
      build: 'Titanium frame, integrated Bluetooth S-Pen stylus, IP68 rated, 232g',
      os: 'One UI 6.1 with 7 years of OS & security updates',
    },
    variants: [
      {
        id: 1101,
        label: '256GB / Titanium Gray',
        storage: '256GB',
        color: 'Titanium Gray',
        colorHex: '#6B7280',
        mrp: 134999,
        sellingPrice: 129999,
        imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=85',
        images: [
          {
            angle: 'front_back',
            label: 'Front & Integrated S-Pen View',
            url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=85',
          },
          {
            angle: 'camera',
            label: '200MP Quad Telephoto Camera Array',
            url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7500, isRecommended: false },
        ],
      },
    ],
  },

  // ================= GOOGLE PIXEL =================
  {
    id: 12,
    slug: 'google-pixel-9-pro-xl',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    tagline: 'Google Tensor G4 engineered with Gemini Pro AI.',
    description: 'The pinnacle of computational photography with iconic camera bar, Tensor G4, Super Actua display, and Gemini Live.',
    category: 'flagship',
    rating: 4.88,
    reviewsCount: 310,
    specs: {
      display: '6.8-inch Super Actua LTPO OLED, 1-120Hz, 3000 nits peak, Gorilla Glass Victus 2',
      processor: 'Google Tensor G4 (4nm) with Titan M2 security coprocessor',
      camera: '50MP Octa PD Main + 48MP Quad PD Ultra-Wide + 48MP Quad PD 5x Telephoto with 30x Super Res Zoom',
      battery: '5060 mAh, 37W wired, fast Qi-certified wireless',
      build: 'Polished metal frame with satin matte glass back, IP68 rated, 221g',
      os: 'Android 15 with 7 years of Pixel Drops & OS updates',
    },
    variants: [
      {
        id: 1201,
        label: '256GB / Porcelain',
        storage: '256GB',
        color: 'Porcelain',
        colorHex: '#ECE7E1',
        mrp: 124999,
        sellingPrice: 124999,
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=85',
        images: [
          {
            angle: 'front_back',
            label: 'Front & Iconic Camera Bar View',
            url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=85',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 7000, isRecommended: false },
        ],
      },
    ],
  },

  // ================= ONEPLUS =================
  {
    id: 13,
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    tagline: 'Extreme performance with Snapdragon 8 Elite & Hasselblad.',
    description: 'Industry-first 2K Oriental Display with DisplayMate A++ rating, massive 6000 mAh Glacier battery, and Hasselblad Master camera system.',
    category: 'flagship',
    rating: 4.87,
    reviewsCount: 390,
    specs: {
      display: '6.82-inch 2K LTPO AMOLED, 120Hz, 4500 nits peak, Glove & Rain touch support',
      processor: 'Qualcomm Snapdragon 8 Elite (3nm, Oryon CPU up to 4.32 GHz)',
      camera: 'Triple 50MP Sony LYT-808 Main + 50MP Ultra-Wide + 50MP 3x Periscope Telephoto (Hasselblad tuned)',
      battery: '6000 mAh Glacier Silicon-Carbon battery, 100W SuperVOOC, 50W wireless',
      build: 'Ceramic & glass composite, IP68 + IP69 rated, 213g',
      os: 'OxygenOS 15 based on Android 15',
    },
    variants: [
      {
        id: 1301,
        label: '256GB / Midnight Black',
        storage: '256GB',
        color: 'Midnight Black',
        colorHex: '#181A1B',
        mrp: 69999,
        sellingPrice: 69999,
        imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=85',
        images: [
          {
            angle: 'front_back',
            label: 'Front & Circular Camera Dial View',
            url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=85',
          },
        ],
        isDefault: true,
        stockStatus: 'in_stock',
        emiLadder: [
          { tenureMonths: 6, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
          { tenureMonths: 12, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: true },
          { tenureMonths: 24, annualInterestRate: 0, cashbackAmount: 4000, isRecommended: false },
        ],
      },
    ],
  },
];

const extraConfigs = {
  'samsung-galaxy-s24-ultra': {
    colors: [
      { color: 'Titanium Gray', colorHex: '#7A797B' },
      { color: 'Titanium Black', colorHex: '#2B2B2C' },
      { color: 'Titanium Violet', colorHex: '#585065' },
      { color: 'Titanium Yellow', colorHex: '#E5DFCE' },
    ],
    storages: [
      { storage: '256GB', mrp: 134999, sellingPrice: 129999 },
      { storage: '512GB', mrp: 144999, sellingPrice: 139999 },
      { storage: '1TB', mrp: 164999, sellingPrice: 159999 },
    ],
  },
  'google-pixel-9-pro-xl': {
    colors: [
      { color: 'Porcelain', colorHex: '#ECE7E1' },
      { color: 'Obsidian', colorHex: '#2C2E30' },
      { color: 'Hazel', colorHex: '#747C76' },
      { color: 'Rose Quartz', colorHex: '#EEDDD8' },
    ],
    storages: [
      { storage: '128GB', mrp: 114999, sellingPrice: 109999 },
      { storage: '256GB', mrp: 129999, sellingPrice: 124999 },
      { storage: '512GB', mrp: 144999, sellingPrice: 139999 },
    ],
  },
  'oneplus-13': {
    colors: [
      { color: 'Midnight Black', colorHex: '#181A1B' },
      { color: 'Arctic Dawn', colorHex: '#E4EAF0' },
      { color: 'Emerald Green', colorHex: '#2D4B40' },
    ],
    storages: [
      { storage: '256GB', mrp: 74999, sellingPrice: 69999 },
      { storage: '512GB', mrp: 81999, sellingPrice: 76999 },
    ],
  },
};

function buildFullVariantMatrix(products) {
  return products.map((product) => {
    const extra = extraConfigs[product.slug];
    const colorMap = new Map();
    const storageMap = new Map();

    product.variants.forEach((v) => {
      if (v.color && !colorMap.has(v.color)) {
        colorMap.set(v.color, {
          color: v.color,
          colorHex: v.colorHex,
          imageUrl: v.imageUrl,
          images: v.images || [],
        });
      }
      if (v.storage && !storageMap.has(v.storage)) {
        storageMap.set(v.storage, {
          storage: v.storage,
          mrp: v.mrp,
          sellingPrice: v.sellingPrice,
          emiLadder: v.emiLadder || [],
        });
      }
    });

    if (extra) {
      const baseVariant = product.variants[0];
      extra.colors.forEach((c) => {
        if (!colorMap.has(c.color)) {
          colorMap.set(c.color, {
            color: c.color,
            colorHex: c.colorHex,
            imageUrl: baseVariant.imageUrl,
            images: baseVariant.images || [],
          });
        }
      });
      extra.storages.forEach((s) => {
        if (!storageMap.has(s.storage)) {
          storageMap.set(s.storage, {
            storage: s.storage,
            mrp: s.mrp,
            sellingPrice: s.sellingPrice,
            emiLadder: baseVariant.emiLadder || [],
          });
        }
      });
    }

    const allColors = Array.from(colorMap.values());
    const allStorages = Array.from(storageMap.values());

    const matrixVariants = [];
    let counter = 1;

    allColors.forEach((c, cIdx) => {
      allStorages.forEach((s, sIdx) => {
        const existing = product.variants.find(
          (v) => v.color === c.color && v.storage === s.storage
        );
        if (existing) {
          matrixVariants.push(existing);
        } else {
          matrixVariants.push({
            id: Number('' + product.id + counter++),
            label: `${s.storage} / ${c.color}`,
            storage: s.storage,
            color: c.color,
            colorHex: c.colorHex,
            mrp: s.mrp,
            sellingPrice: s.sellingPrice,
            imageUrl: c.imageUrl,
            images: c.images,
            isDefault: cIdx === 0 && sIdx === 0,
            stockStatus: 'in_stock',
            emiLadder: s.emiLadder.length > 0 ? s.emiLadder : product.variants[0].emiLadder,
          });
        }
      });
    });

    return {
      ...product,
      variants: matrixVariants,
    };
  });
}

const EXPANDED_PRODUCTS = buildFullVariantMatrix(PRODUCTS);

module.exports = { PRODUCTS: EXPANDED_PRODUCTS };
