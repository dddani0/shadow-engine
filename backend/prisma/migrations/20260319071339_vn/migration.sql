/*
  Warnings:

  - Added the required column `timeline` to the `Scene` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "timeline" TEXT NOT NULL;
