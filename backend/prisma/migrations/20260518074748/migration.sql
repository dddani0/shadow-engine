/*
  Warnings:

  - Made the column `title` on table `Scene` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Scene" ALTER COLUMN "title" SET NOT NULL;
