/*
  Warnings:

  - You are about to drop the column `actionId` on the `Choice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[choiceMenuId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `choiceMenuId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_actionId_fkey";

-- DropIndex
DROP INDEX "Choice_actionId_key";

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "actionId",
ADD COLUMN     "choiceMenuId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "choiceMenuId" TEXT;

-- CreateTable
CREATE TABLE "ChoiceMenu" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "ChoiceMenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Choice_choiceMenuId_key" ON "Choice"("choiceMenuId");

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_choiceMenuId_fkey" FOREIGN KEY ("choiceMenuId") REFERENCES "ChoiceMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_choiceMenuId_fkey" FOREIGN KEY ("choiceMenuId") REFERENCES "ChoiceMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
