import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

interface variantType {
  color: string;
  size: string;
  price: number;
  salePrice: number;
  stockQuantity: number;
  sku: string;
  images: any[];
}

export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    longDescription,
    basePrice,
    salePrice,
    stockQuantity,
    isVariant,
    variants,
    categoryId,
    images,
    additionalInfo,
  } = req.body;

  const inStock = isVariant ? false : stockQuantity > 0;
  console.log(additionalInfo);

  if (!isVariant) {
    const createProduct = await prisma.product.create({
      data: {
        name,
        brand,
        description,
        longDescription,
        basePrice,
        salePrice,
        inStock,
        stockQuantity,
        categoryId,
        additionalInfo: additionalInfo || null,
        images: {
          create: images.map((image: any) => ({
            url: image.url,
            isMainImage: image.isMainImage,
          })),
        },
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, createProduct, "Product added successfully"));
  }

  const productWithVariant = await prisma.product.create({
    data: {
      name,
      brand,
      description,
      longDescription,
      salePrice,
      basePrice,
      isVariant: true,
      inStock,
      stockQuantity,
      categoryId,
      additionalInfo: additionalInfo || null,
      variants: {
        create: variants.map((variant: variantType) => ({
          color: variant.color,
          size: variant.size,
          price: variant.price,
          salePrice: variant.salePrice,
          stockQuantity: variant.stockQuantity,
          sku: variant.sku,
          images: {
            create: variant.images.map((image) => ({
              url: image.url,
              isMainImage: image.isMainImage,
            })),
          },
        })),
      },
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        productWithVariant,
        "Product with variant added successfully"
      )
    );
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { page, limit, search, category, subCategory, price, color, size } =
    req.query;

  // Pagination
  const pageNumber = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 9;
  const skip = (pageNumber - 1) * pageSize;

  // Search query
  const searchQuery = (search as string) || "";

  // Filters parsing
  const categoryFilters =
    (typeof category === "string" && category?.split(",")) || [];
  const subCategoryFilters =
    (typeof subCategory === "string" && subCategory?.split(",")) || [];
  const colorFilter = (typeof color === "string" && color?.split(",")) || [];
  const sizeFilter = (typeof size === "string" && size?.split(",")) || [];
  const [minPrice, maxPrice] = (typeof price === "string" &&
    price
      ?.split("-")
      .map((p) => (isNaN(parseFloat(p)) ? null : parseFloat(p)))) || [
    null,
    null,
  ];

  // Construct filters
  const filters: any = {
    AND: [],
  };

  // Search filter
  if (searchQuery) {
    filters.AND.push({
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    });
  }

  // Category and Subcategory filters
  if (categoryFilters.length > 0) {
    filters.AND.push({
      OR: [
        { category: { name: { in: categoryFilters } } }, // Parent categories
        { category: { parent: { name: { in: categoryFilters } } } }, // Subcategories
      ],
    });
  }

  if (subCategoryFilters.length > 0) {
    filters.AND.push({
      category: { name: { in: subCategoryFilters } },
    });
  }

  // Price filter
  if (minPrice !== null && maxPrice !== null) {
    filters.AND.push({
      OR: [
        { basePrice: { gte: minPrice, lte: maxPrice } }, // Products with base price in range
        {
          variants: {
            some: { price: { gte: minPrice, lte: maxPrice } }, // Variants with price in range
          },
        },
      ],
    });
  }

  // Color filter
  if (colorFilter.length > 0) {
    filters.AND.push({
      variants: {
        some: { color: { in: colorFilter } },
      },
    });
  }

  // Size filter
  if (sizeFilter.length > 0) {
    filters.AND.push({
      variants: {
        some: { size: { in: sizeFilter } },
      },
    });
  }

  console.log("Filter Query:", JSON.stringify(filters));

  // Fetch products with relevant variants only
  const products = await prisma.product.findMany({
    where: filters,
    include: {
      images: true,
      category: true,
      reviews: true,
      variants: {
        where: {
          ...(colorFilter.length > 0 && { color: { in: colorFilter } }),
          ...(sizeFilter.length > 0 && { size: { in: sizeFilter } }),
        },
      },
    },
    skip,
    take: pageSize,
  });

  // Check for no products found
  if (!products.length) {
    throw new ApiError(404, "No products found");
  }

  // Return response
  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully"));
});
