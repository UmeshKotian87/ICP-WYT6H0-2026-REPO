export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Obsidian Chronograph",
    price: 489,
    originalPrice: 620,
    description: "Precision-engineered timepiece with sapphire crystal",
    longDescription: "The Obsidian Chronograph combines Swiss movement precision with modern aesthetics. Featuring a scratch-resistant sapphire crystal, 100m water resistance, and a 42-hour power reserve.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"],
    rating: 4.8, reviews: 124, inStock: true, badge: "Sale",
    tags: ["luxury", "accessories"],
  },
  {
    id: "2",
    name: "Noir Leather Wallet",
    price: 89,
    description: "Full-grain Italian leather bifold with RFID blocking",
    longDescription: "Crafted from full-grain Italian leather that develops a beautiful patina over time. Features 6 card slots, 2 bill compartments, and RFID-blocking technology.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop"],
    rating: 4.6, reviews: 89, inStock: true,
    tags: ["leather", "accessories"],
  },
  {
    id: "3",
    name: "Architect Desk Lamp",
    price: 219,
    description: "Articulated brass arm with warm-spectrum LED",
    longDescription: "An architect-inspired desk lamp with a fully articulated brass arm and dimmable warm-spectrum LED (2700K). The weighted base ensures stability.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop"],
    rating: 4.9, reviews: 56, inStock: true, badge: "New",
    tags: ["home", "lighting"],
  },
  {
    id: "4",
    name: "Merino Field Jacket",
    price: 340,
    originalPrice: 420,
    description: "100% merino wool with waxed cotton lining",
    longDescription: "A heritage-inspired field jacket in 100% fine merino wool with a waxed cotton lining for weather resistance.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop"],
    rating: 4.7, reviews: 203, inStock: true, badge: "Sale",
    tags: ["clothing", "outerwear"],
  },
  {
    id: "5",
    name: "Carbon Fiber Pen",
    price: 145,
    description: "Aerospace-grade carbon fiber with German nib",
    longDescription: "Machined from aerospace-grade carbon fiber with a Rhodium-coated German steel nib.",
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop"],
    rating: 4.5, reviews: 41, inStock: true,
    tags: ["stationery"],
  },
  {
    id: "6",
    name: "Onyx Ceramic Mug",
    price: 48,
    description: "Hand-thrown stoneware with matte black glaze",
    longDescription: "Each mug is hand-thrown on a wheel and finished with a food-safe matte black glaze.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop"],
    rating: 4.4, reviews: 312, inStock: false,
    tags: ["home", "kitchen"],
  },
  {
    id: "7",
    name: "Titanium Flask",
    price: 78,
    description: "Grade-5 titanium, 18oz, lifetime guarantee",
    longDescription: "Machined from grade-5 titanium. No metallic taste, no BPA, and a lifetime guarantee.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop"],
    rating: 4.9, reviews: 178, inStock: true, badge: "Best Seller",
    tags: ["outdoor", "accessories"],
  },
  {
    id: "8",
    name: "Linen Throw Blanket",
    price: 128,
    description: "Stonewashed French linen, 140x200cm",
    longDescription: "Woven from 100% French linen that has been stonewashed for a soft, lived-in feel from day one.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop"],
    rating: 4.6, reviews: 95, inStock: true,
    tags: ["home", "textiles"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const categories = [...new Set(products.map((p) => p.category))];
