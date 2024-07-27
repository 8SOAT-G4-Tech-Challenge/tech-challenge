/*
  Warnings:

  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `payment_order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'received', 'preparation', 'ready', 'finished', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentOrderStatus" AS ENUM ('pending', 'approved', 'authorized', 'in_process', 'in_mediation', 'rejected', 'cancelled', 'refunded', 'charged_back');

-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'created';

-- AlterTable
ALTER TABLE "payment_order" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentOrderStatus" NOT NULL DEFAULT 'pending';
