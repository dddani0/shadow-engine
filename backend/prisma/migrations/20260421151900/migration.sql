/*
  Warnings:

  - You are about to drop the column `choiceId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `choiceMenuId` on the `Component` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[componentId]` on the table `ChoiceMenu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_choiceId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_choiceMenuId_fkey";

-- DropIndex
DROP INDEX "Action_choiceId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "choiceId";

-- AlterTable
ALTER TABLE "ChoiceMenu" ADD COLUMN     "componentId" TEXT;

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "choiceMenuId";

-- CreateIndex
CREATE UNIQUE INDEX "ChoiceMenu_componentId_key" ON "ChoiceMenu"("componentId");

-- AddForeignKey
ALTER TABLE "ChoiceMenu" ADD CONSTRAINT "ChoiceMenu_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;
