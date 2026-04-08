-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_sceneId_fkey";

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
