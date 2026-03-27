/*
  Warnings:

  - You are about to drop the `ObjectComponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObjectComponentGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ObjectComponent" DROP CONSTRAINT "ObjectComponent_objectComponentGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ObjectComponentGroup" DROP CONSTRAINT "ObjectComponentGroup_fromSceneId_fkey";

-- DropTable
DROP TABLE "ObjectComponent";

-- DropTable
DROP TABLE "ObjectComponentGroup";

-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Component_sceneId_key" ON "Component"("sceneId");

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
