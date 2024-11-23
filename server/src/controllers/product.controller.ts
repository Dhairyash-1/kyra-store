import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { createSlug } from "../utils/helpter";

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

  // Validate required fields
  if (!name || !brand || !categoryId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Missing required fields"));
  }

  // Helper function to map images
  const mapImages = (images: any[]) =>
    images.map((image: any) => ({
      url: image.url,
      isMainImage: image.isMainImage,
    }));

  const slug = createSlug(name);

  if (!isVariant) {
    // Non-variant product logic
    const inStock = stockQuantity > 0;
    const product = await prisma.product.create({
      data: {
        name,
        brand,
        slug,
        description,
        longDescription,
        basePrice,
        salePrice,
        stockQuantity,
        inStock,
        categoryId,
        additionalInfo: additionalInfo || null,
        images: { create: mapImages(images) }, // Map and assign images
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product added successfully"));
  }

  // Variant product logic
  const totalStockQuantity = variants.reduce(
    (total: number, variant: any) => total + (variant.stockQuantity || 0),
    0
  );
  const inStock = totalStockQuantity > 0;

  const productWithVariants = await prisma.product.create({
    data: {
      name,
      brand,
      slug,
      description,
      longDescription,
      isVariant: true,
      basePrice,
      salePrice,
      inStock,
      stockQuantity: totalStockQuantity,
      categoryId,
      additionalInfo: additionalInfo || null,
      images: {
        create: images.map((image: any, index: number) => ({
          url: image.url,
          isMainImage: index === 0, // Assign the first image as main image
        })),
      },
      variants: {
        create: variants.map((variant: any) => ({
          color: variant.color,
          size: variant.size,
          price: variant.price,
          salePrice: variant.salePrice,
          stockQuantity: variant.stockQuantity,
          sku: variant.sku,
          images: {
            create: mapImages(variant.images), // Map and assign images for each variant
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
        productWithVariants,
        "Product with variants added successfully"
      )
    );
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page,
    limit,
    search,
    category,
    subCategory,
    price,
    color,
    size,
    sortBy = "newest",
  } = req.query;
  // sortBy - latest/price l-h/price h-l/ rating h-l
  let sort: any = {};

  if (sortBy === "price-asc") {
    sort.basePrice = "asc";
  } else if (sortBy === "price-desc") {
    sort.basePrice = "desc";
  } else if (sortBy === "newest") {
    sort.createdAt = "desc";
  }

  // Pagination
  const pageNumber = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 6;
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
        { category: { slug: { in: categoryFilters } } }, // Parent categories
        { category: { parent: { slug: { in: categoryFilters } } } }, // Subcategories
      ],
    });
  }

  if (subCategoryFilters.length > 0) {
    filters.AND.push({
      category: { slug: { in: subCategoryFilters } },
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

  // console.log("filters", JSON.stringify(filters));

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
        include: { images: true },
      },
    },
    orderBy: sort,
    skip,
    take: pageSize,
  });

  const totalCount = await prisma.product.count({
    where: filters,
  });
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = pageNumber < totalPages;

  // Check for no products found
  if (!products.length) {
    throw new ApiError(404, "No products found");
  }

  // Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        totalProducts: totalCount,
        currentPage: pageNumber,
        hasNextPage,
        totalPages,
      },
      "All products fetched successfully"
    )
  );
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.query;

  console.log(slug);

  if (!slug) {
    throw new ApiError(400, "Slug is required");
  }

  const product = await prisma.product.findUnique({
    where: { slug: slug as string },
    include: {
      variants: true,
      images: true,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found with given slug");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export const getBestSellerProduct = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    take: 8,
    include: {
      images: true,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, products, "Bestseller product fetched successfully")
    );
});
