interface ProductColorsTypes {
  id: number;
  variantId: number;
  name: string;
  hexCode: string;
  price: number;
  listPrice: number;
  images: {
    url: string;
    isMainImage: string;
  }[];
  sizes: {
    id: number;
    variantId: number;
    name: string;
    stockQuantity?: number;
    price: number;
    listPrice: number;
  }[];
}

export interface ProductType {
  id: number;
  name: string;
  brand: string;
  slug: string;
  description: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  variants: {
    id: number;
    price: number;
    listPrice: number;
    color: { id: number; name: string };
    size: { id: number; name: string };
  }[];
  productImage: { url: string }[];
}

export interface SingleProductType {
  id: number;
  name: string;
  brand: string;
  description: string;
  slug: string;
  price: number;
  listPrice: number;
  additionalInfo: object;
  category: { id: number; name: string; slug: string; parentId: number };
  colors: ProductColorsTypes[];
  createdAt: Date;
  updatedAt: Date;
}

export interface getAllProductsResponseType {
  statusCode: number;
  data: {
    products: ProductType[];
    totalProducts: number;
    currentPage: number;
    hasNextPage: boolean;
  };
  message: string;
  success: boolean;
}
export interface bestSellerProductsResponse {
  statusCode: number;
  data: ProductType[];
  message: string;
  success: boolean;
}

export interface singleProductRespose {
  statusCode: number;
  data: SingleProductType;
  message: string;
  success: boolean;
}
