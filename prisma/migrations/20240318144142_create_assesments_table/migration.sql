-- CreateTable
CREATE TABLE `assesments` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `scoreDiet` FLOAT NOT NULL,
    `scorePhysicalActivity` FLOAT NOT NULL,
    `scoreMentalHealth` FLOAT NOT NULL,
    `totalScore` FLOAT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assesments` ADD CONSTRAINT `assesments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
