/*
  Warnings:

  - You are about to alter the column `street` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `street` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `privince` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NOT NULL,
    MODIFY `postal_code` VARCHAR(191) NOT NULL;
