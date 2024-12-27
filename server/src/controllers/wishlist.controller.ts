import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const toggleProductWishlist = asyncHandler(
  async (req: CustomRequest, res) => {
    const { id } = req.params;
    const userId = req?.user?.id;
    if (!userId) {
      throw new ApiError(409, "Unauthorized request");
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new ApiError(404, "No product with give Id");
    }

    const isAlreadyInWishlist = await prisma.wishlist.findFirst({
      where: {
        productId: product.id,
      },
    });

    if (isAlreadyInWishlist) {
      await prisma.wishlist.delete({
        where: {
          id: isAlreadyInWishlist.id,
        },
      });

      return res
        .status(201)
        .json(
          new ApiResponse(201, {}, "Product removed from wishlist successfully")
        );
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        productId: product.id,
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        productId: true,
        userId: true,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, wishlist, "Product added to wishlist successfully")
      );
  }
);

export const getAllUserWishlistProducts = asyncHandler(
  async (req: CustomRequest, res) => {
    const userId = req?.user?.id;

    if (!userId) {
      throw new ApiError(409, "Unauthorized request");
    }

    const wishlistProducts = await prisma.wishlist.findMany({
      where: { userId },
      select: { productId: true },
    });

    const productIds = wishlistProducts.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        brand: true,
        slug: true,
        variants: {
          take: 1,
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
            size: { select: { id: true, name: true } },
          },
        },
        productImage: true,
      },
    });

    const formattedProducts = products.map((product) => {
      const variantColorId = product.variants[0]?.color?.id;

      const mainImage = variantColorId
        ? product.productImage.find(
            (image) => image.colorId === variantColorId && image.isMainImage
          )?.url
        : product.productImage.find((image) => image.isMainImage)?.url;

      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        slug: product.slug,
        price: product.variants[0]?.price,
        listPrice: product.variants[0]?.listPrice,
        color: product.variants[0]?.color,
        size: product.variants[0]?.size,
        variantId: product.variants[0].id,
        mainImage: mainImage,
      };
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          formattedProducts,
          "All wishlist product fetched successfully"
        )
      );
  }
);
