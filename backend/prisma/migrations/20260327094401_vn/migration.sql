/*
  Warnings:

  - You are about to drop the column `toTimelineId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Timeline` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timelineId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sceneId]` on the table `Timeline` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spriteId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Made the column `timelineId` on table `Action` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `sceneId` to the `Timeline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_timelineId_fkey";

-- DropForeignKey
ALTER TABLE "Timeline" DROP CONSTRAINT "Timeline_projectId_fkey";

-- DropIndex
DROP INDEX "Project_toTimelineId_key";

-- DropIndex
DROP INDEX "Timeline_projectId_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "spriteId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "timelineId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "toTimelineId";

-- AlterTable
ALTER TABLE "Timeline" DROP COLUMN "projectId",
ADD COLUMN     "sceneId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_timelineId_key" ON "Action"("timelineId");

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_sceneId_key" ON "Timeline"("sceneId");

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
