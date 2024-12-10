export interface ProductType {
  id: number;
  name: string;
  brand: string;
  listPrice: number;
  price: number;
  images: any[];
  description: string;
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
