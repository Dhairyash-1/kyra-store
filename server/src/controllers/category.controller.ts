import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createProductCategory = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, parentId } = req.body;

  const isCategoryExist = await prisma.category.findUnique({
    where: { name },
  });

  if (isCategoryExist) {
    throw new ApiError(400, "Category Already Exists");
  }

  const uniqueSlug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  if (parentId) {
    const item = await prisma.category.findUnique({
      where: { id: parentId },
    });

    if (!item) {
      throw new ApiError(400, "No category with given parentId exist");
    }
  }

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

  const updateData: any = {};

  if (name) {
    const alreadyExistCateogry = await prisma.category.findUnique({
      where: { name },
    });

    if (alreadyExistCateogry && alreadyExistCateogry.id !== category.id) {
      throw new ApiError(400, "Category with this name already exists");
    }
    updateData.name = name;

    const uniqueSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    updateData.slug = uniqueSlug;
  }

  if (description) updateData.description = description;
  if (imageUrl) updateData.imageUrl = imageUrl;
  if (parentId !== undefined) updateData.parentId = parentId;

  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

export const getAllProductCategory = asyncHandler(async (req, res) => {
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
