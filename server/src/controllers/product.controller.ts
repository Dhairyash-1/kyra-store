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

  // Fetch product with variants and category
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

  if (!product) {
    throw new ApiError(404, "Product not found with the given slug");
  }

  // Fetch product images
  const images = await prisma.productImage.findMany({
    where: { productId: product.id },
    select: {
      url: true,
      isMainImage: true,
      colorId: true,
    },
  });

  // Prepare color and size mapping
  const colorsMap = new Map<
    number,
    {
      id: number;
      name: string;
      hexCode: string | null;
      variantId: number;
      price: number;
      listPrice: number;
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
  >();

  product.variants.forEach((variant) => {
    if (variant.color) {
      const colorId = variant.color.id;

      // Initialize color entry if not already added
      if (!colorsMap.has(colorId)) {
        const colorImages = images.filter((img) => img.colorId === colorId);
        colorsMap.set(colorId, {
          id: colorId,
          name: variant.color.name,
          hexCode: variant.color.hexCode,
          variantId: variant.id,
          price: variant.price,
          listPrice: variant.listPrice,
          images:
            colorImages.length > 0
              ? colorImages.map((img) => ({
                  url: img.url,
                  isMainImage: img.isMainImage,
                }))
              : images // Fallback to product-level images
                  .filter((img) => !img.colorId)
                  .map((img) => ({
                    url: img.url,
                    isMainImage: img.isMainImage,
                  })),
          sizes: [],
        });
      }

      // Add size to the color entry
      const colorEntry = colorsMap.get(colorId)!;
      if (variant.size) {
        if (!colorEntry.sizes.find((size) => size.id === variant.size!.id)) {
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

  // Transform colors and order sizes and colors
  const colors = Array.from(colorsMap.values()).map((color) => {
    return {
      ...color,
      sizes: color.sizes.sort((a, b) => a.id - b.id), // Order sizes by ID (or name if needed)
    };
  });

  // Sort colors by ID or name
  const sortedColors = colors.sort((a, b) => a.id - b.id);

  // Final transformed product object
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
    colors: sortedColors, // Include sorted colors
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
          size: true,
          listPrice: true,
          price: true,
          colorId: true,
        },
      },
    },
    skip,
    take: pageSize,
  });

  const productIds = products.map((product) => product.id);
  const images = await prisma.productImage.findMany({
    where: {
      productId: { in: productIds },
      isMainImage: true,
    },
    select: {
      productId: true,
      colorId: true,
      url: true,
    },
  });
  const transformedProduct = products.map((product) => {
    return {
      ...product,
      variants: product.variants.map((variant) => {
        return {
          ...variant,
          images: images.filter(
            (image) =>
              image.colorId === variant.colorId &&
              image.productId === product.id
          ),
        };
      }),
    };
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
        products: transformedProduct,
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
      productImage: {
        where: {
          isMainImage: true,
        },
        select: {
          isMainImage: true,
          url: true,
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

export const getAllAdminProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      brand: true,
      name: true,
      isPublished: true,
      category: {
        select: {
          name: true,
          id: true,
        },
      },
      variants: {
        select: {
          price: true,
          isDefault: true,
          listPrice: true,
          stockQuantity: true,
          color: {
            select: {
              name: true,
              hexCode: true,
            },
          },
        },
      },
      productImage: {
        where: {
          isMainImage: true,
        },
      },
    },
  });

  // Add unique colors and modify product structure
  const productsWithUniqueColors = products.map((product) => {
    // Get unique colors for the product
    const uniqueColors = product.variants
      .map((variant) => variant.color)
      .filter(
        (value, index, self) =>
          self.findIndex(
            (color) =>
              color!.name === value!.name && color!.hexCode === value!.hexCode
          ) === index
      );

    // Calculate total stock
    const totalStock = product.variants.reduce(
      (sum, variant) => sum + variant.stockQuantity,
      0
    );

    // Extract price and listPrice of the default variant (assuming first variant is the default)
    const defaultVariant = product.variants.find(
      (variant) => variant.isDefault
    ); // You can change this logic if there's a flag for default variant
    const defaultPrice = defaultVariant ? defaultVariant.price : null;
    const defaultListPrice = defaultVariant ? defaultVariant.listPrice : null;

    return {
      id: product.id,
      brand: product.brand,
      name: product.name,
      isPublished: product.isPublished,
      category: product.category,
      productImage: product.productImage, // Assuming you want the main image
      uniqueColors, // Adding unique colors
      totalStock, // Adding total stock
      price: defaultPrice, // Default variant price
      listPrice: defaultListPrice, // Default variant list price
    };
  });

  res.status(200).json(new ApiResponse(200, productsWithUniqueColors));
});

export const getAdminProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    select: {
      name: true,
      brand: true,
      description: true,
      slug: true,
      additionalInfo: true,
      isPublished: true,
      category: {
        select: {
          id: true,
          name: true,
          parentId: true,
        },
      },
      variants: {
        select: {
          id: true,
          price: true,
          listPrice: true,
          stockQuantity: true,
          sku: true,
          isDefault: true,
          colorId: true,
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
            },
          },
        },
      },
      productImage: {
        select: {
          url: true,
          isMainImage: true,
          colorId: true,
        },
      },
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found with the given Id");
  }

  let mainCategory = null;
  let subCategory = null;

  // Check category parentId to determine if it's a main or subcategory
  if (product.category.parentId === null) {
    mainCategory = {
      id: product.category.id,
      name: product.category.name,
    };
  } else {
    subCategory = {
      id: product.category.id,
      name: product.category.name,
    };
  }

  // If the category has a parentId, the parent category will be set as the mainCategory
  if (product.category.parentId !== null) {
    const parentCategory = await prisma.category.findUnique({
      where: { id: product.category.parentId },
      select: { id: true, name: true },
    });

    mainCategory = {
      id: parentCategory?.id ?? 0,
      name: parentCategory?.name ?? "",
    };
  }

  // Transforming the product data into the required format
  const transformedProduct = {
    name: product.name,
    brand: product.brand,
    description: product.description,
    slug: product.slug,
    additionalInfo: product.additionalInfo,
    isPublished: product.isPublished,
    mainCategory: mainCategory,
    subCategory: subCategory,
    variants: Object.values(
      // @ts-ignore
      product.variants.reduce((acc: Record<number, variantType>, variant) => {
        // Group by color
        const colorId = variant.colorId;
        if (!colorId) return acc; // Return acc if colorId is invalid
        if (!variant.color) return;
        if (!acc[colorId]) {
          acc[colorId] = {
            color: {
              id: variant.color.id,
              name: variant.color.name,
              hexCode: variant.color.hexCode as string,
            },
            sizes: [],
            images: [],
          };
        }

        // Add sizes
        acc[colorId].sizes.push({
          size: {
            id: variant.size!.id,
            name: variant.size!.name,
          },
          price: variant.price,
          listPrice: variant.listPrice,
          stock: variant.stockQuantity,
          sku: variant.sku,
        });

        // Add images for the color
        const colorImages = product.productImage
          .filter((img) => img.colorId === colorId)
          .map((img) => ({
            url: img.url,
            isMainImage: img.isMainImage,
          }));

        acc[colorId].images = colorImages;

        return acc;
      }, {} as Record<number, variantType>)
    ),
  };

  return res.status(200).json(new ApiResponse(200, transformedProduct));
});

export const updateProductBasicInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return;
  const { name, brand, description, isPublished, slug, additionalInfo } =
    req.body;

  if (!name || !brand || !description || !slug || !additionalInfo) {
    throw new ApiError(400, "Field is required to update");
  }
  const updateData: {
    name?: string;
    brand?: string;
    description?: string;
    isPublished?: boolean;
    slug?: string;
    additionalInfo?: object;
  } = {};
  if (name) updateData.name = name;
  if (brand) updateData.brand = brand;
  if (isPublished) updateData.isPublished = isPublished === "true";
  if (description) updateData.description = description;
  if (slug) updateData.slug = slug;
  if (additionalInfo) updateData.additionalInfo = additionalInfo;

  console.log(updateData);

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!product) {
    throw new ApiError(404, "No product found");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: updateData,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProduct, "Basic Product Details Updated")
    );
});
export const updateProductCategoryInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { mainCategoryId, subCategoryId } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    throw new ApiError(404, "No product found");
  }

  if (subCategoryId) {
    // so update the subCategory and its parent
    const updateCategory = await prisma.product.update({
      where: { id: product.id },
      data: {
        categoryId: subCategoryId,
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, updateCategory, "Product category updated"));
  }

  const updatedProductCategory = await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      categoryId: mainCategoryId,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProductCategory, "Product category updated")
    );
});
export const updateProductVariant = asyncHandler(async (req, res) => {});
export const AddNewProductVariant = asyncHandler(async (req, res) => {});
