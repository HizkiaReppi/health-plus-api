/*
  Warnings:

  - You are about to alter the column `lastLogin` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `assesments` MODIFY `totalScore` FLOAT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `lastLogin` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `questions` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `category` ENUM('DIET', 'PHYSICAL_ACTIVITY', 'MENTAL_HEALTH') NOT NULL,
    `options` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
