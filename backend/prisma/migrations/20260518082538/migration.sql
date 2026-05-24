-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "loadSceneId" TEXT;

-- CreateTable
CREATE TABLE "_ActionToVariable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActionToVariable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ActionToVariable_B_index" ON "_ActionToVariable"("B");

-- AddForeignKey
ALTER TABLE "_ActionToVariable" ADD CONSTRAINT "_ActionToVariable_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToVariable" ADD CONSTRAINT "_ActionToVariable_B_fkey" FOREIGN KEY ("B") REFERENCES "Variable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
