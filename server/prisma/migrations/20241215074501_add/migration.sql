/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `priceAtPurchase` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_slug_idx";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "priceAtPurchase" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE INDEX "Product_slug_categoryId_name_idx" ON "Product"("slug", "categoryId", "name");
