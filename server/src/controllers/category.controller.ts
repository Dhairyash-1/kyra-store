import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { createSlug } from "../utils/helpter";

export const createProductCategory = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, parentId } = req.body;

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      name,
      parentId: parentId || null,
    },
  });

  if (isCategoryExist) {
    throw new ApiError(
      400,
      parentId
        ? "Subcategory with this name already exists in the parent category"
        : "Parent category with this name already exists"
    );
  }

  if (parentId) {
    const parentCategory = await prisma.category.findUnique({
      where: { id: parentId },
    });

    if (!parentCategory) {
      throw new ApiError(400, "No category with the given parentId exists");
    }
  }

  const uniqueSlug = createSlug(name);

  const createCategory = await prisma.category.create({
    data: {
      name,
      slug: uniqueSlug,
      description: description || null,
      imageUrl: imageUrl || null,
      parentId: parentId || null,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, createCategory, "Product Category Created"));
});

export const updateProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, parentId } = req.body;

  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (name) {
    // Check for duplicate names within the same scope
    const isCategoryExist = await prisma.category.findFirst({
      where: {
        name,
        parentId: parentId || null, // Scope uniqueness to the parentId
        NOT: { id: parseInt(id) }, // Exclude the current category from the check
      },
    });

    if (isCategoryExist) {
      throw new ApiError(
        400,
        parentId
          ? "Subcategory with this name already exists in the parent category"
          : "Parent category with this name already exists"
      );
    }
  }

  // Validate the parentId if it is being updated
  if (parentId) {
    const parentCategory = await prisma.category.findUnique({
      where: { id: parentId },
    });

    if (!parentCategory) {
      throw new ApiError(400, "No category with the given parentId exists");
    }
  }

  // Update the category
  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      imageUrl,
      parentId,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

export const getAllProductCategory = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    where: { parentId: null }, // Only parent categories
    include: { children: true }, // Include children for each category
  });

  interface CategoryHierarchy {
    [key: string]: {
      id: number;
      subcategories: { id: number; name: string; slug: string }[];
    };
  }

  // Map the categories to the new structure
  const categoryHierarchy: CategoryHierarchy = categories.reduce(
    (acc, category) => {
      acc[category.name] = {
        id: category.id,
        subcategories: category.children.map((child) => ({
          id: child.id,
          name: child.name,
          slug: child.slug,
        })),
      };
      return acc;
    },
    {} as CategoryHierarchy
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, categoryHierarchy, "Categories fetched successfully")
    );
});
export const getAllProductFilterCategory = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
  });

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export const getProductCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.query);
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { children: true },
  });
  if (!category) {
    throw new ApiError(404, "No category found with given id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category by fetched successfully"));
});

export const deleteProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await prisma.category.delete({
    where: { id: parseInt(id) },
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully"));
});

export const getTrendingCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    where: {
      imageUrl: { not: null },
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: "desc",
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        categories,
        "Trending categories fetched successfully"
      )
    );
});
