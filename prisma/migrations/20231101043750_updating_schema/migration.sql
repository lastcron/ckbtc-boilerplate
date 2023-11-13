/*
  Warnings:

  - You are about to drop the column `merchant_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_merchant_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `merchant_id`,
    DROP COLUMN `username`;
