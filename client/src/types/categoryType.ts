export interface createCategoryRequest {
  name: string;
  description?: string;
  parentId?: number | null;
}

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Categories {
  [key: string]: Category;
}
export interface createCategoryResponse {
  statusCode: number;
  data: {
    id: number;
    name: string;
    description?: string;
    parentId?: number | null;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}

export interface CategoryType {
  id: number;
  name: string;
  description?: string;
  imageUrl: string | null;
  parentId?: number | null;
  slug: string;
  children?: CategoryType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AllCategoryResponse {
  statusCode: number;
  data: Categories;
  message: string;
  success: boolean;
}

export interface TrendingCategoriesResponse {
  statusCode: number;
  data: {
    id: number;
    name: string;
    imageUrl: string;
    slug: string;
    parentId: null | number;
  }[];
  message: string;
  success: boolean;
}
