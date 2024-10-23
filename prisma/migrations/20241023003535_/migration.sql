/*
  Warnings:

  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[route]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" DROP CONSTRAINT "Page_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Page_pkey" PRIMARY KEY ("route");

-- CreateIndex
CREATE UNIQUE INDEX "Page_route_key" ON "Page"("route");
