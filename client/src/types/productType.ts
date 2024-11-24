export interface ProductType {
  id: number;
  name: string;
  brand: string;
  basePrice: number;
  salePrice: number;
  inStock: boolean;
  images: any[];
  description: string;
  longDescription: string;
  isVariant: boolean;
  slug: string;
  variants: any[];
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
  data: ProductType;
  message: string;
  success: boolean;
}
