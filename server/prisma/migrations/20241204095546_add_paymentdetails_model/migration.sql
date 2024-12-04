/*
  Warnings:

  - You are about to drop the column `stripeCheckoutId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentDetailsId]` on the table `PaymentFailureDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentDetailsId` to the `PaymentFailureDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentFailureDetails" DROP CONSTRAINT "PaymentFailureDetails_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stripeCheckoutId";

-- AlterTable
ALTER TABLE "PaymentFailureDetails" ADD COLUMN     "paymentDetailsId" INTEGER NOT NULL,
ALTER COLUMN "failedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "PaymentDetails" (
    "id" SERIAL NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "stripeChargeId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "PaymentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetails_orderId_key" ON "PaymentDetails"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentFailureDetails_paymentDetailsId_key" ON "PaymentFailureDetails"("paymentDetailsId");

-- AddForeignKey
ALTER TABLE "PaymentDetails" ADD CONSTRAINT "PaymentDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentFailureDetails" ADD CONSTRAINT "PaymentFailureDetails_paymentDetailsId_fkey" FOREIGN KEY ("paymentDetailsId") REFERENCES "PaymentDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
