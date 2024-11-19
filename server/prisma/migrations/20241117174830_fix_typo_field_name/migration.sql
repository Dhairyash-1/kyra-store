/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `baseprice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "CategoryId",
DROP COLUMN "baseprice",
ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
