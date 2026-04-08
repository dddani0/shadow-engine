-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_timelineId_fkey";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
