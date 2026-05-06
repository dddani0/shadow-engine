-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_choiceMenuId_fkey";

-- AlterTable
ALTER TABLE "Choice" ALTER COLUMN "choiceMenuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_choiceMenuId_fkey" FOREIGN KEY ("choiceMenuId") REFERENCES "ChoiceMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
