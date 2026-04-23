/*
  Warnings:

  - You are about to drop the column `fromSceneId` on the `Choice` table. All the data in the column will be lost.
  - You are about to drop the column `toSceneId` on the `Choice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[choiceId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[actionId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actionId` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_fromSceneId_fkey";

-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_toSceneId_fkey";

-- DropIndex
DROP INDEX "Choice_fromSceneId_key";

-- DropIndex
DROP INDEX "Choice_toSceneId_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "choiceId" TEXT;

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "fromSceneId",
DROP COLUMN "toSceneId",
ADD COLUMN     "actionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_choiceId_key" ON "Action"("choiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Choice_actionId_key" ON "Choice"("actionId");

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
