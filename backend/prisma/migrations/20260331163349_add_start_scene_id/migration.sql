-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "spriteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "startSceneId" TEXT;
