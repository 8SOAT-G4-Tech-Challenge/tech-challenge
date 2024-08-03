/*
  Warnings:

  - You are about to drop the column `amount` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `payment_order` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `product` table. All the data in the column will be lost.
  - Added the required column `value` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `payment_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "amount",
ADD COLUMN     "value" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "payment_order" DROP COLUMN "amount",
ADD COLUMN     "value" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "amount",
ADD COLUMN     "value" MONEY NOT NULL;
