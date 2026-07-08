import Product, { ProductSize } from "@/types/Products";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Pima Cotton T-Shirt",
    price: 290000,
    image_src: "/images/product1.png",
    image_alt: "Premium Pima Cotton T-Shirt in clean slate gray",
    category: "t-shirt",
    release_date: "2026-06-15",
    description: "Crafted from 100% long-staple Pima cotton, this t-shirt offers exceptional softness, durability, and a clean modern silhouette that retains its shape wash after wash."
  },
  {
    id: 2,
    name: "Cozy Cable-Knit Wool Sweater",
    price: 790000,
    image_src: "/images/product2.png",
    image_alt: "Cable-Knit Wool Sweater in elegant cream color",
    category: "sweater",
    release_date: "2026-06-10",
    description: "A timeless winter staple knit from premium Merino wool blend. Features classic cable styling, ribbed cuffs and hem, and a structured fit that layers perfectly."
  },
  {
    id: 3,
    name: "Fine-Gauge Button Cardigan",
    price: 680000,
    image_src: "/images/product3.png",
    image_alt: "Fine-Gauge Button Cardigan in navy blue",
    category: "cardigan",
    release_date: "2026-06-05",
    description: "Designed for smart-casual settings, this lightweight cardigan features a modern button-up front, premium horn buttons, and a super-soft feel against the skin."
  },
  {
    id: 4,
    name: "Luxury Pique Cotton Polo",
    price: 450000,
    image_src: "/images/product4.png",
    image_alt: "Luxury Pique Cotton Polo in sophisticated black",
    category: "polo shirt",
    release_date: "2026-06-01",
    description: "Elevate your weekend wardrobe with this breathable pique cotton polo. Detailed with a contrast collar band and embroidered chest emblem."
  },
  {
    id: 5,
    name: "Vintage Washed Oversized Tee",
    price: 320000,
    image_src: "/images/product5.png",
    image_alt: "Vintage Washed Oversized Tee in charcoal",
    category: "t-shirt",
    release_date: "2026-05-25",
    description: "Featuring a custom garment-dyed finish, this boxy-fit tee delivers a relaxed retro streetwear aesthetic with dropped shoulders and a heavy weight drape."
  },
  {
    id: 6,
    name: "Ribbed Mock-Neck Pullover",
    price: 850000,
    image_src: "/images/product1.png",
    image_alt: "Ribbed Mock-Neck Pullover in beige",
    category: "sweater",
    release_date: "2026-05-20",
    description: "A contemporary mock-neck knit with horizontal ribbed texture. Warm yet breathable, making it a perfect stand-alone top or undershield layer."
  },
  {
    id: 7,
    name: "Oversized Knitted Cardigan Jacket",
    price: 890000,
    image_src: "/images/product2.png",
    image_alt: "Oversized Knitted Cardigan Jacket in forest green",
    category: "cardigan",
    release_date: "2026-05-15",
    description: "A cozy fusion of cardigan comfort and jacket structure. Features an oversized fit, drop shoulders, deep front pockets, and a heavy gauge chunky knit structure."
  },
  {
    id: 8,
    name: "Smart-Fit Mercerized Polo",
    price: 490000,
    image_src: "/images/product3.png",
    image_alt: "Smart-Fit Mercerized Polo in pure white",
    category: "polo shirt",
    release_date: "2026-05-10",
    description: "Crafted from double-mercerized long-staple cotton for a beautiful lustrous sheen, silky texture, and a tailored professional fit."
  },
  {
    id: 9,
    name: "Minimalist Pocket Crewneck",
    price: 270000,
    image_src: "/images/product4.png",
    image_alt: "Minimalist Pocket Crewneck in dusty olive",
    category: "t-shirt",
    release_date: "2026-04-28",
    description: "A clean, functional cotton crewneck tee featuring a reinforced chest pocket. Cut for comfort and daily wearability."
  },
  {
    id: 10,
    name: "Classic V-Neck Knit Sweater",
    price: 720000,
    image_src: "/images/product5.png",
    image_alt: "Classic V-Neck Knit Sweater in heather gray",
    category: "sweater",
    release_date: "2026-04-15",
    description: "A versatile V-neck sweater knit from soft cotton-acrylic blend. Ideal for layering over collared shirts for a refined business-casual appearance."
  },
  {
    id: 11,
    name: "Textured Cable Cardigan",
    price: 750000,
    image_src: "/images/product1.png",
    image_alt: "Textured Cable Cardigan in cream wash",
    category: "cardigan",
    release_date: "2026-04-05",
    description: "Features a modern combination of cable patterns and waffle-knit structures. Soft, warm, and highly breathable for transitioning seasons."
  },
  {
    id: 12,
    name: "Zip-Collar Knit Polo Shirt",
    price: 480000,
    image_src: "/images/product2.png",
    image_alt: "Zip-Collar Knit Polo Shirt in graphite gray",
    category: "polo shirt",
    release_date: "2026-03-20",
    description: "A contemporary knit polo replacing traditional buttons with a sleek metal zip closure, presenting a clean sporty profile."
  }
];

export const mockProductSizes: Record<number, ProductSize[]> = {
  1: [
    { size: "S", stock: 12 },
    { size: "M", stock: 15 },
    { size: "L", stock: 8 },
    { size: "XL", stock: 5 }
  ],
  2: [
    { size: "M", stock: 4 },
    { size: "L", stock: 6 },
    { size: "XL", stock: 2 }
  ],
  3: [
    { size: "S", stock: 5 },
    { size: "M", stock: 10 },
    { size: "L", stock: 12 }
  ],
  4: [
    { size: "S", stock: 8 },
    { size: "M", stock: 14 },
    { size: "L", stock: 18 },
    { size: "XL", stock: 7 }
  ],
  5: [
    { size: "M", stock: 22 },
    { size: "L", stock: 15 },
    { size: "XL", stock: 11 }
  ],
  6: [
    { size: "S", stock: 6 },
    { size: "M", stock: 8 },
    { size: "L", stock: 5 }
  ],
  7: [
    { size: "M", stock: 10 },
    { size: "L", stock: 12 },
    { size: "XL", stock: 4 }
  ],
  8: [
    { size: "S", stock: 7 },
    { size: "M", stock: 9 },
    { size: "L", stock: 15 },
    { size: "XL", stock: 3 }
  ],
  9: [
    { size: "S", stock: 14 },
    { size: "M", stock: 20 },
    { size: "L", stock: 10 }
  ],
  10: [
    { size: "S", stock: 4 },
    { size: "M", stock: 8 },
    { size: "L", stock: 11 },
    { size: "XL", stock: 6 }
  ],
  11: [
    { size: "M", stock: 7 },
    { size: "L", stock: 8 },
    { size: "XL", stock: 2 }
  ],
  12: [
    { size: "S", stock: 10 },
    { size: "M", stock: 12 },
    { size: "L", stock: 6 }
  ]
};

export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "$2b$12$ZHBJ4n8pZmG.0a2ARPDcheKMFzcM3hE50ANE9deo9h8K2rTQCCoQG", // password = 123456
    role: "admin"
  },
  {
    id: "2",
    name: "Lê Phúc Anh",
    email: "lpa@example.com",
    password: "$2b$12$ZHBJ4n8pZmG.0a2ARPDcheKMFzcM3hE50ANE9deo9h8K2rTQCCoQG", // password = 123456
    role: "admin"
  }
];

export const runtimeUsers = [...mockUsers];

export interface MockOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface MockOrder {
  id: string;
  user_id: string;
  date: string;
  status: string;
  total: number;
  payment_method: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  items: MockOrderItem[];
}

export const runtimeOrders: MockOrder[] = [
  {
    id: "ORD-928172",
    user_id: "1",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Đã giao",
    total: 330000,
    payment_method: "COD",
    shipping_name: "John Doe",
    shipping_phone: "0123456789",
    shipping_address: JSON.stringify({ details: "123 Street", province: "Hanoi" }),
    items: [
      {
        name: "Premium Pima Cotton T-Shirt",
        quantity: 1,
        price: 290000
      }
    ]
  }
];

export interface Review {
  id: string;
  product_id: number;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export const mockReviews: Review[] = [
  {
    id: "REV-1",
    product_id: 1,
    user_id: "1",
    user_name: "Ryan",
    rating: 5,
    comment: "The pima cotton fabric is exceptionally soft and lightweight. It fits exactly as expected and keeps its shape well after washing.",
    created_at: "2025-10-12T12:00:00Z"
  },
  {
    id: "REV-2",
    product_id: 1,
    user_id: "2",
    user_name: "Adam",
    rating: 4,
    comment: "Very clean stitching and premium feel. Perfect for smart-casual layering.",
    created_at: "2025-11-04T15:30:00Z"
  },
  {
    id: "REV-3",
    product_id: 2,
    user_id: "1",
    user_name: "John Doe",
    rating: 5,
    comment: "Extremely warm and cozy knit. The cable styling looks very premium. High quality merino wool blend.",
    created_at: "2025-12-01T09:15:00Z"
  }
];

export const runtimeReviews: Review[] = [...mockReviews];

