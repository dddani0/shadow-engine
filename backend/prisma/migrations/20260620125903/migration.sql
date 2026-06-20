-- DropForeignKey
ALTER TABLE "ChoiceMenu" DROP CONSTRAINT "ChoiceMenu_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Sprite" DROP CONSTRAINT "Sprite_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Textbox" DROP CONSTRAINT "Textbox_componentId_fkey";

-- AddForeignKey
ALTER TABLE "ChoiceMenu" ADD CONSTRAINT "ChoiceMenu_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprite" ADD CONSTRAINT "Sprite_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Textbox" ADD CONSTRAINT "Textbox_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;
