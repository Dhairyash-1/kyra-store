export interface createCategoryRequest {
  name: string;
  description?: string;
  parentId?: number | null;
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

interface CategoryType {
  id: number;
  name: string;
  description?: string;
  parentId?: number | null;
  children?: CategoryType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AllCategoryResponse {
  statusCode: number;
  data: CategoryType[];
  message: string;
  success: boolean;
}
