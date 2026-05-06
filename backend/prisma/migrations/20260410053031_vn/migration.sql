-- DropForeignKey
ALTER TABLE "Textbox" DROP CONSTRAINT "Textbox_componentId_fkey";

-- AlterTable
ALTER TABLE "Textbox" ALTER COLUMN "componentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Textbox" ADD CONSTRAINT "Textbox_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;
