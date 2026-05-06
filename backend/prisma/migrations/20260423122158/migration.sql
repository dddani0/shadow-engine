/*
  Warnings:

  - Added the required column `actionId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "actionId" TEXT NOT NULL;
