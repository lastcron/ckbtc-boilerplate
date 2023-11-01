/*
  Warnings:

  - Added the required column `terminal_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `terminal_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_terminal_id_fkey` FOREIGN KEY (`terminal_id`) REFERENCES `terminals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
