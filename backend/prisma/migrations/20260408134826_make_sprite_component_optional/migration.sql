-- DropForeignKey
ALTER TABLE "Sprite" DROP CONSTRAINT "Sprite_componentId_fkey";

-- AlterTable
ALTER TABLE "Sprite" ALTER COLUMN "componentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sprite" ADD CONSTRAINT "Sprite_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;
