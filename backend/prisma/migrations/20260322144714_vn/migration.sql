/*
  Warnings:

  - You are about to drop the column `content` on the `Scene` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `Scene` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromSceneId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toSceneId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toTimelineId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "toTimelineId" TEXT;

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "content",
DROP COLUMN "timeline";

-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectComponentGroup" (
    "id" TEXT NOT NULL,
    "fromSceneId" TEXT NOT NULL,

    CONSTRAINT "ObjectComponentGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectComponent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "objectComponentGroupId" TEXT NOT NULL,

    CONSTRAINT "ObjectComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "timelineId" TEXT,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_projectId_key" ON "Timeline"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Choice_fromSceneId_key" ON "Choice"("fromSceneId");

-- CreateIndex
CREATE UNIQUE INDEX "Choice_toSceneId_key" ON "Choice"("toSceneId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_toTimelineId_key" ON "Project"("toTimelineId");

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectComponentGroup" ADD CONSTRAINT "ObjectComponentGroup_fromSceneId_fkey" FOREIGN KEY ("fromSceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectComponent" ADD CONSTRAINT "ObjectComponent_objectComponentGroupId_fkey" FOREIGN KEY ("objectComponentGroupId") REFERENCES "ObjectComponentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
