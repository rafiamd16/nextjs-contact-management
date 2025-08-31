/*
  Warnings:

  - Made the column `phone` on table `contacts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "phone" SET NOT NULL;
