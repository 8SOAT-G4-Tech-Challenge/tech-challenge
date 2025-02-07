/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "payment_order" DROP CONSTRAINT "payment_order_orderId_fkey";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "payment_order";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "PaymentOrderStatus";
