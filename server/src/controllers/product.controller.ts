import { Prisma, ProductImage, ProductVariant } from "@prisma/client";
import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { createSlug } from "../utils/helpter";

export const addSize = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const isSizeExist = await prisma.size.findUnique({
    where: {
      name: name.toUpperCase(),
    },
  });

  if (isSizeExist) {
    throw new ApiError(400, `Size ${isSizeExist.name} already exist`);
  }

  const size = await prisma.size.create({
    data: {
      name: name.toUpperCase(),
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, size, "Size created successfully"));
});

export const addColor = asyncHandler(async (req, res) => {
  const { name, hexCode } = req.body;

  if (!name || !hexCode) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingColor = await prisma.color.findFirst({
    where: {
      OR: [{ name: name.toUpperCase() }, { hexCode: hexCode.toUpperCase() }],
    },
  });

  if (existingColor) {
    throw new ApiError(
      409,
      "A color with this name or hex code already exists."
    );
  }

  const color = await prisma.color.create({
    data: {
      name: name.toUpperCase(),
      hexCode: hexCode.toUpperCase() || null,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, color, "Color created successfully."));
});

export const getAllProductColors = asyncHandler(async (req, res) => {
  const colors = await prisma.color.findMany({
    include: {
      variants: {
        where: { stockQuantity: { gt: 0 } },
        select: {
          productId: true,
        },
      },
    },
  });

  const colorsWithAvailableProductCount = colors.map((color) => {
    const uniqueProductIds = new Set(
      color.variants.map((variant) => variant.productId)
    );
    return {
      ...color,
      productCount: uniqueProductIds.size,
    };
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        colorsWithAvailableProductCount,
        "All colors fetched"
      )
    );
});

export const getAllProductSizes = asyncHandler(async (req, res) => {
  const sizes = await prisma.size.findMany({
    include: {
      variants: {
        select: {
          productId: true,
        },
      },
    },
  });

  const sizesWithProductCount = sizes.map((size) => {
    const uniqueProductIds = new Set(
      size.variants.map((variant) => variant.productId)
    );
    return {
      id: size.id,
      name: size.name,
      productCount: uniqueProductIds.size,
    };
  });

  res
    .status(200)
    .json(new ApiResponse(200, sizesWithProductCount, "All sizes fetched"));
});

interface colorType {
  id: number;
  name: string;
  hexCode?: string;
}

interface sizeType {
  size: { id: number; name: string };
  price: number;
  listPrice: number;
  sku: string;
  stock: number;
}

interface variantType {
  color: colorType;
  sizes: sizeType[];
  images: { url: string; isMainImage: boolean }[];
}

interface addProductBodyType {
  name: string;
  brand: string;
  description: string;
  additionalInfo: object;
  isPublished: boolean;
  slug?: string;
  mainCategory: { id: number; name: string };
  subCategory: { id: number; name: string };
  variants: variantType[];
}

export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    subCategory,
    mainCategory,
    isPublished,
    variants,
    additionalInfo,
  }: addProductBodyType = req.body;

  if (!name || !brand || !variants || !subCategory.id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Missing required fields"));
  }

  const slug = createSlug(name);

  // 1.  create the main product
  const product = await prisma.product.create({
    data: {
      name,
      brand,
      description: description || "no description provided",
      categoryId: subCategory.id,
      slug,
      isPublished: isPublished || false,
      additionalInfo: additionalInfo || null,
    },
  });

  // 2. create variant data for each size and color and image data for each color
  const variantData: Prisma.ProductVariantUncheckedCreateInput[] = [];
  const imageData: Prisma.ProductImageUncheckedCreateInput[] = [];

  variants.forEach((variant, vi) => {
    variant.sizes.forEach((size, si) => {
      const isDefaultVariant = vi === 0 && si === 0;
      variantData.push({
        productId: product.id,
        sizeId: size.size.id,
        colorId: variant.color.id,
        listPrice: size.listPrice,
        price: size.price,
        isDefault: isDefaultVariant,
        stockQuantity: size.stock,
        sku: size.sku || `${name}-${size.size.name}-${variant.color.name}`,
      });
    });

    if (variant.images) {
      variant.images.forEach((image) => {
        imageData.push({
          url: image.url,
          isMainImage: image.isMainImage,
          colorId: variant.color.id,
          productId: product.id,
        });
      });
    }
  });

  const transaction = await prisma.$transaction([
    prisma.productVariant.createMany({ data: variantData }),
    prisma.productImage.createMany({ data: imageData }),
  ]);

  const createdProduct = await prisma.product.findUnique({
    where: { id: product.id },
    include: { variants: true },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdProduct, "Product created successfully"));
});

export const getProductVariantId = asyncHandler(async (req, res) => {
  const { sizeId, colorId, productId } = req.params;

  const variant = await prisma.productVariant.findFirst({
    where: {
      AND: [
        { colorId: Number(colorId) },
        { sizeId: Number(sizeId) },
        { productId: Number(productId) },
      ],
    },
  });

  if (!variant) {
    throw new ApiError(404, "No variant for this combination");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { variantId: variant.id }, "Variant Id fetched")
    );
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    throw new ApiError(400, "Slug is required");
  }

  const product = await prisma.product.findUnique({
    where: { slug: slug as string, isPublished: true },
    select: {
      createdAt: true,
      updatedAt: true,
      id: true,
      brand: true,
      name: true,
      description: true,
      slug: true,
      additionalInfo: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          parentId: true,
        },
      },
      variants: {
        select: {
          id: true,
          price: true,
          listPrice: true,
          stockQuantity: true,
          color: {
            select: {
              id: true,
              name: true,
              hexCode: true,
              images: true,
            },
          },
          size: {
            select: {
              id: true,
              name: true,
              variants: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found with given slug");
  }

  interface ColorType {
    id: number;
    name: string;
    variantId: number;
    hexCode: string | null;
    listPrice: number;
    price: number;
    images: { url: string; isMainImage: boolean }[];
    sizes: {
      id: number;
      name: string;
      variantId: number;
      stockQuantity: number;
      listPrice: number;
      price: number;
    }[];
  }

  const colorsMap = new Map<number, ColorType>();

  product.variants.forEach((variant) => {
    if (variant.color) {
      const colorId = variant.color.id;

      if (!colorsMap.has(colorId)) {
        colorsMap.set(colorId, {
          id: colorId,
          variantId: variant.id,
          name: variant.color.name,
          hexCode: variant.color.hexCode,
          images: variant.color.images.map((img) => ({
            url: img.url,
            isMainImage: img.isMainImage,
          })),
          sizes: [],
          listPrice: variant.listPrice,
          price: variant.price,
        });
      }

      const colorEntry = colorsMap.get(colorId)!;
      if (variant.size) {
        // @ts-expect-error
        if (!colorEntry.sizes.find((size) => size.id === variant.size.id)) {
          colorEntry.sizes.push({
            id: variant.size.id,
            name: variant.size.name,
            variantId: variant.id,
            stockQuantity: variant.stockQuantity,
            listPrice: variant.listPrice,
            price: variant.price,
          });
        }
      }
    }
  });

  const transformedProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    slug: product.slug,
    price: product.variants[0]?.price || 0,
    listPrice: product.variants[0]?.listPrice || 0,
    additionalInfo: product.additionalInfo,
    category: product.category,
    colors: Array.from(colorsMap.values()),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  res
    .status(200)
    .json(
      new ApiResponse(200, transformedProduct, "Product fetched successfully")
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
  }: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    subCategory?: string;
    price?: string;
    color?: string;
    size?: string;
    sortBy?: string;
  } = req.query;

  // Pagination
  const pageNumber = parseInt(page || "1", 10);
  const pageSize = parseInt(limit || "6", 10);
  const skip = (pageNumber - 1) * pageSize;

  // Sort by logic
  let sort: any = {};
  if (sortBy === "price-asc") {
    sort.listPrice = "asc";
  } else if (sortBy === "price-desc") {
    sort.listPrice = "desc";
  } else if (sortBy === "newest") {
    sort.createdAt = "desc";
  }

  // Search query
  const searchQuery = search || "";

  // Filters parsing and validation
  const categoryFilters: string[] = category ? category.split(",") : [];
  const subCategoryFilters: string[] = subCategory
    ? subCategory.split(",")
    : [];
  const colorFilter: string[] = color ? color.split(",") : [];
  const sizeFilter: string[] = size ? size.split(",") : [];
  const [minPrice, maxPrice] = price
    ? price.split("-").map((p) => (isNaN(parseFloat(p)) ? null : parseFloat(p)))
    : [null, null];

  // Construct filters
  const filters: any = {
    AND: [
      {
        isPublished: true,
      },
    ],
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

  // Category filters
  if (categoryFilters.length > 0) {
    filters.AND.push({
      OR: [
        { category: { slug: { in: categoryFilters } } },
        { category: { parent: { slug: { in: categoryFilters } } } },
      ],
    });
  }

  // Subcategory filters
  if (subCategoryFilters.length > 0) {
    filters.AND.push({
      category: { slug: { in: subCategoryFilters } },
    });
  }

  // Price filter
  if (minPrice !== null && maxPrice !== null) {
    filters.AND.push({
      variants: {
        some: { listPrice: { gte: minPrice, lte: maxPrice } },
      },
    });
  }

  // Color filter
  if (colorFilter.length > 0) {
    filters.AND.push({
      variants: {
        some: {
          color: {
            name: { in: colorFilter },
          },
        },
      },
    });
  }

  // Size filter
  if (sizeFilter.length > 0) {
    filters.AND.push({
      variants: {
        some: {
          size: {
            name: { in: sizeFilter },
          },
        },
      },
    });
  }

  // Fetch products with relevant variants only
  const products = await prisma.product.findMany({
    where: filters,
    include: {
      category: true,
      variants: {
        where: {
          ...(colorFilter.length > 0 && {
            color: { name: { in: colorFilter } },
          }),
          ...(sizeFilter.length > 0 && { size: { name: { in: sizeFilter } } }),
        },
        orderBy: sort,
        take: 1,
        select: {
          id: true,
          color: {
            include: {
              images: {
                where: {
                  isMainImage: true,
                },
                select: {
                  url: true,
                  isMainImage: true,
                },
              },
            },
          },
          size: true,
          listPrice: true,
          price: true,
        },
      },
    },
    skip,
    take: pageSize,
  });

  // Calculate total count and pages
  const totalCount = await prisma.product.count({
    where: filters,
  });
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = pageNumber < totalPages;

  // Check if no products found
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

export const getBestSellerProduct = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
    },
    take: 8,
    select: {
      id: true,
      name: true,
      brand: true,
      slug: true,
      variants: {
        where: {
          isDefault: true,
        },
        select: {
          id: true,
          listPrice: true,
          price: true,
          color: {
            select: {
              id: true,
              name: true,
              images: {
                where: {
                  isMainImage: true,
                },
                select: {
                  url: true,
                  isMainImage: true,
                },
              },
            },
          },
          size: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, products, "Bestseller product fetched successfully")
    );
});
