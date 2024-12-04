/*
  Warnings:

  - Added the required column `stripeCheckoutId` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentDetails" ADD COLUMN     "stripeCheckoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentFailureDetails" ADD COLUMN     "status" TEXT,
ALTER COLUMN "stripePaymentIntentId" DROP NOT NULL,
ALTER COLUMN "failureCode" DROP NOT NULL,
ALTER COLUMN "failureMessage" DROP NOT NULL;
