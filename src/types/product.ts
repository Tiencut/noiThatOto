export type Product = {
  id: string;
  name: string;
  category: string;
  carModels: string[];
  description?: string;
  price?: { shopee?: number; lazada?: number; tiktok?: number; original?: number };
  rating?: { score?: number; count?: number; reviews?: string[] };
  image?: { thumb?: string; full?: string; gallery?: string[] };
  affiliate?: { shopee?: string; lazada?: string; tiktok?: string };
  aiInfo?: Record<string, string>;
  specs?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
};
