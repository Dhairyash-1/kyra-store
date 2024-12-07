import prisma from "../prismaClient/prismaClient";
import { CustomRequest } from "../types/customRequest";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  shippingCharge: number;
  totalQuantity: number;
  totalPrice: number;
}

export const getUserCart = async (userId: number): Promise<CartState> => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
    select: {
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              salePrice: true,
              images: {
                where: {
                  isMainImage: true,
                },
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      shippingCharge: 0,
      totalQuantity: 0,
      totalPrice: 0,
    };
  }

  const items: CartItem[] = cart.items.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.salePrice as number,
    quantity: item.quantity,
    image: item.product.images?.[0]?.url || "",
    totalPrice: (item.product.salePrice as number) * item.quantity,
  }));

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);

  let shippingCharge = 0;
  if (totalPrice > 0 && totalPrice < 500) {
    shippingCharge = 40;
  }

  return {
    items,
    shippingCharge: shippingCharge,
    totalQuantity,
    totalPrice,
  };
};

export const addOrUpdateItemQuantity = asyncHandler(
  async (req: CustomRequest, res) => {
    const { productId, quantity } = req.body;
    console.log(productId, quantity);

    // Validate inputs
    if (!productId || quantity == null) {
      throw new ApiError(400, "Invalid product ID or quantity");
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new ApiError(404, "Product does not exist");
    }

    if (product.stockQuantity && quantity > product.stockQuantity) {
      throw new ApiError(
        400,
        product.stockQuantity > 0
          ? `Only ${product.stockQuantity} item(s) are remaining.`
          : "Product is out of stock"
      );
    }

    let userCart = await prisma.cart.findUnique({
      where: {
        userId: req.user?.id,
      },
      include: {
        items: true,
      },
    });

    // If the user does not have a cart, create a new cart and add the item
    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          userId: req.user?.id as number,
          items: {
            create: [
              {
                productId: productId,
                quantity: quantity,
              },
            ],
          },
        },
        include: {
          items: true,
        },
      });

      return res
        .status(201)
        .json(new ApiResponse(201, userCart, "New cart created"));
    }

    const productExistInCart = userCart.items.find(
      (item) => item.productId === productId
    );

    if (productExistInCart) {
      // Directly update the quantity to the one provided from the frontend
      if (product.stockQuantity && quantity > product.stockQuantity) {
        throw new ApiError(
          400,
          `Only ${product.stockQuantity} item(s) are remaining.`
        );
      }

      // Optimistic update: directly update the cart item with the new quantity
      await prisma.cart.update({
        where: {
          userId: req.user?.id,
        },
        data: {
          items: {
            update: {
              where: {
                id: productExistInCart.id,
              },
              data: {
                quantity: quantity, // directly update the quantity
              },
            },
          },
        },
      });

      // Fetch the updated cart
      userCart = await prisma.cart.findUnique({
        where: {
          userId: req.user?.id,
        },
        include: {
          items: true,
        },
      });

      return res
        .status(200)
        .json(new ApiResponse(200, userCart, "Cart updated successfully"));
    } else {
      // Add a new product to the cart with the provided quantity
      if (product.stockQuantity && quantity > product.stockQuantity) {
        throw new ApiError(
          400,
          `Only ${product.stockQuantity} item(s) are remaining.`
        );
      }

      await prisma.cart.update({
        where: {
          userId: req.user?.id,
        },
        data: {
          items: {
            create: {
              productId: productId,
              quantity: quantity,
            },
          },
        },
      });

      userCart = await prisma.cart.findUnique({
        where: {
          userId: req.user?.id,
        },
        include: {
          items: true,
        },
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, userCart, "Product added to cart successfully")
        );
    }
  }
);

export const getUserCartItems = asyncHandler(
  async (req: CustomRequest, res) => {
    if (!req.user?.id) {
      throw new ApiError(400, "User Id is required");
    }

    const cart = await getUserCart(req.user?.id);

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "User cart fetched"));
  }
);

export const removeCartItem = asyncHandler(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, "Product id required");
  }

  const product = await prisma.cartItem.findFirst({
    where: {
      productId: Number(productId),
    },
  });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await prisma.cartItem.delete({
    where: {
      id: product.id,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item removed from cart"));
});
export const clearCart = asyncHandler(async (req: CustomRequest, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(400, "user id required");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!cart) {
    throw new ApiError(404, "cart not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart cleared successfully"));
});

export const syncCart = asyncHandler(async (req: CustomRequest, res) => {
  const { localCart }: { localCart: CartItem[] } = req.body;
  const userId = req.user?.id as number;
  console.log("syncCart");
  let userCart = await getUserCart(userId);
  if (localCart.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, userCart, "no item for sync"));
  }
  if (!userCart) {
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
        items: {
          create: localCart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newCart, "Cart created and synced"));
  }

  for (const item of localCart) {
    const existingItem = userCart.items.find(
      (cartItem) => cartItem.id === item.id
    );

    if (!existingItem) {
      await prisma.cart.update({
        where: {
          userId: userId,
        },
        data: {
          items: {
            create: {
              productId: item.id,
              quantity: item.quantity,
            },
          },
        },
      });
    }
  }

  const updatedCart = await getUserCart(userId);
  res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart synced successfully"));
});
