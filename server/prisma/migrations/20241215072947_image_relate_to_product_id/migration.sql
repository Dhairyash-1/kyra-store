/*
  Warnings:

  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
