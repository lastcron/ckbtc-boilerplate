/*
  Warnings:

  - You are about to drop the column `username` on the `terminals` table. All the data in the column will be lost.
  - Added the required column `name` to the `terminals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `terminals` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
