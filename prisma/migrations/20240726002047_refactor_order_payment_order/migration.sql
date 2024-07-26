/*
  Warnings:

  - You are about to drop the column `amount` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `payment_order` table. All the data in the column will be lost.
  - Added the required column `amount` to the `payment_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "payment_order" DROP COLUMN "paidAt",
ADD COLUMN     "amount" MONEY NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3);
