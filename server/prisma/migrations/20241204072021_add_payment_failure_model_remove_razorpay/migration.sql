/*
  Warnings:

  - You are about to drop the column `failureReason` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayOrderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `razorpayPaymentId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "failureReason",
DROP COLUMN "razorpayOrderId",
DROP COLUMN "razorpayPaymentId";

-- CreateTable
CREATE TABLE "PaymentFailureDetails" (
    "id" SERIAL NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "failureCode" TEXT NOT NULL,
    "failureMessage" TEXT NOT NULL,
    "failedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentFailureDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentFailureDetails" ADD CONSTRAINT "PaymentFailureDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
