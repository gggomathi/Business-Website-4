export type SareeCategory =
  | 'kanchipuram'
  | 'wedding'
  | 'bridal'
  | 'traditional'
  | 'designer'
  | 'festive'
  | 'new-arrivals';

export interface Saree {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: SareeCategory;
  categoryLabel: string;
  image: string;
  additionalImages?: string[];
  isSignature?: boolean;
  isNewArrival?: boolean;
  color: string;
  zari: string;
  fabric: string;
  weave: string;
  blousePiece: string;
  length: string;
  weight: string;
  care: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  blouseStitching?: 'unstitched' | 'standard' | 'custom';
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  review: string;
  sareePurchased: string;
  date: string;
}

export interface FilterState {
  category: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  searchQuery: string;
  priceRange: [number, number];
}
