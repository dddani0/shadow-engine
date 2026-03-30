-- CreateTable
CREATE TABLE "Sprite" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,

    CONSTRAINT "Sprite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Textbox" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT[],
    "charPerSecond" INTEGER NOT NULL,
    "componentId" TEXT NOT NULL,

    CONSTRAINT "Textbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sprite_componentId_key" ON "Sprite"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Textbox_componentId_key" ON "Textbox"("componentId");

-- AddForeignKey
ALTER TABLE "Sprite" ADD CONSTRAINT "Sprite_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Textbox" ADD CONSTRAINT "Textbox_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
