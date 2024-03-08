/*
  Warnings:

  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrder_AB_unique" ON "_ItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
