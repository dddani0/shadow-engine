/*
  Warnings:

  - You are about to drop the column `spriteId` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "spriteId",
ADD COLUMN     "componentId" TEXT;
