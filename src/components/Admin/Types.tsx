export type Product = {
  id?: string;
  name?: string;
  category?: string;
  price?: { original?: number };
  image?: { thumb?: string };
  affiliate?: { shopee?: string; lazada?: string; tiktok?: string };
  description?: string;
  carModels?: string[] | string;
  tags?: string[] | string;
  rating?: { score?: number };
};

export type ProductFormShape = Omit<Product, 'id'> & { carModels?: string; tags?: string };
