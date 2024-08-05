/*
  Warnings:

  - Made the column `description` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL;
