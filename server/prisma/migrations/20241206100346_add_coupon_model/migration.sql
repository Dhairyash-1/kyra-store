-- CreateEnum
CREATE TYPE "CouponTypes" AS ENUM ('FLAT', 'PERCENTAGE', 'FREE_SHIPPING');

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "type" "CouponTypes" NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "minCartValue" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);
