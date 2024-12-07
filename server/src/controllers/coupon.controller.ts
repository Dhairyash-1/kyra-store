import prisma from "../prismaClient/prismaClient";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createCoupon = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    couponCode,
    discountValue,
    minCartValue,
    startDate,
    endDate,
    isActive,
    usageLimit,
  } = req.body;

  const duplicateCoupon = await prisma.coupon.findFirst({
    where: {
      couponCode: couponCode.trim().toUpperCase(),
    },
  });

  if (duplicateCoupon) {
    throw new ApiError(
      409,
      `Coupon with code ${duplicateCoupon.couponCode} already exist`
    );
  }

  if (type === "FLAT" && minCartValue < discountValue) {
    throw new ApiError(
      400,
      "Minimum cart value must be greater than or equal to discountValue"
    );
  }

  const coupon = await prisma.coupon.create({
    data: {
      name,
      type,
      couponCode,
      discountValue,
      minCartValue: minCartValue && null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isActive,
      usageLimit,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, coupon, "New Coupon Created Successfully"));
});

const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await prisma.coupon.findMany();

  if (coupons.length === 0) {
    throw new ApiError(404, "No coupons found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, coupons, "All coupons fetched"));
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  const code = couponCode.trim().toUpperCase();
  if (!code) {
    throw new ApiError(400, "Coupon requied");
  }

  const coupon = await prisma.coupon.findFirst({
    where: {
      couponCode: code,
      startDate: {
        gte: new Date(),
      },
      endDate: {
        lte: new Date(),
      },
      isActive: true,
    },
  });

  if (!coupon) {
    throw new ApiError(404, "Invaild coupon code");
  }
});
