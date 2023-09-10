/*
  Warnings:

  - You are about to alter the column `email` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `contacts_username_fkey`;

-- AlterTable
ALTER TABLE `contacts` MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
