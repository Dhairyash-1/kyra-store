/*
  Warnings:

  - You are about to drop the column `stripeCheckoutId` on the `PaymentDetails` table. All the data in the column will be lost.
  - Added the required column `stripeCheckoutId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeCheckoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentDetails" DROP COLUMN "stripeCheckoutId";
