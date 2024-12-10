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

  if (!name && !hexCode) {
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
interface colorType {
  id: number;
  name: string;
  hexCode?: string;
  images: { url: string; isMainImage: boolean }[];
}

interface sizeType {
  id: number;
  name: string;
}

interface variantType {
  colors: colorType[];
  sizes: sizeType[];
  price?: number;
  listPrice?: number;
  stockQuantity: number;
  sku?: string;
}

interface addProductBodyType {
  name: string;
  brand: string;
  description: string;
  listPrice: number;
  price: number;
  categoryId: number;
  additionalInfo: object;
  variants: variantType[];
}
// export const addProduct = asyncHandler(async (req, res) => {});
// export const getProductBySlug = asyncHandler(async (req, res) => {});
// export const getAllProducts = asyncHandler(async (req, res) => {});
export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    listPrice,
    price,
    variants,
    categoryId,
    additionalInfo,
  }: addProductBodyType = req.body;

  if (!name || !brand || !categoryId || !variants) {
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
      description,
      categoryId,
      slug,
      additionalInfo: additionalInfo || null,
    },
  });

  // 2. create variant for each size and color

  if (variants && variants.length > 0) {
    for (let variant of variants) {
      for (let size of variant.sizes) {
        for (let color of variant.colors) {
          // 3. create variant with color+size data
          const variantData = await prisma.productVariant.create({
            data: {
              listPrice: variant.listPrice || listPrice,
              price: variant.price || price,
              stockQuantity: variant.stockQuantity,
              sku: variant.sku || `${name}-${size.name}-${color.name}`,
              productId: product.id,
              colorId: color.id,
              sizeId: size.id,
            },
          });

          // 4. attach image for colour

          if (color.images && color.images.length > 0) {
            for (let image of color.images) {
              await prisma.productImage.create({
                data: {
                  url: image.url,
                  isMainImage: image.isMainImage,
                  colorId: color.id,
                  productVariantId: variantData.id,
                },
              });
            }
          }
        }
      }
    }
  }
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
    where: { slug: slug as string },
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
          images: {
            select: {
              isMainImage: true,
              url: true,
            },
          },
          color: {
            select: {
              id: true,
              name: true,
              hexCode: true,
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
    images: { url: string; isMainImage: boolean }[];
    sizes: {
      id: number;
      name: string;
      variantId: number;
      stockQuantity: number;
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
          images: variant.images.map((img) => ({
            url: img.url,
            isMainImage: img.isMainImage,
          })),
          sizes: [],
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
    sort.basePrice = "asc";
  } else if (sortBy === "price-desc") {
    sort.basePrice = "desc";
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
        take: 1,
        select: {
          id: true,
          color: true,
          size: true,
          listPrice: true,
          price: true,
          images: {
            where: {
              isMainImage: true,
            },
          },
        },
      },
    },
    orderBy: sort,
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
    take: 8,
    select: {
      id: true,
      name: true,
      brand: true,
      slug: true,
      variants: {
        take: 1,
        select: {
          listPrice: true,
          price: true,
          images: {
            where: {
              isMainImage: true,
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
