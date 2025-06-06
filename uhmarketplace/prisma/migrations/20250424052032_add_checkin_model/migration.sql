-- CreateTable
CREATE TABLE `UserCheckIns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `question1` VARCHAR(191) NOT NULL,
    `answer1` VARCHAR(191) NOT NULL,
    `question2` VARCHAR(191) NOT NULL,
    `answer2` VARCHAR(191) NOT NULL,
    `question3` VARCHAR(191) NOT NULL,
    `answer3` VARCHAR(191) NOT NULL,
    `personalNote` VARCHAR(191) NOT NULL,
    `sentimentLabel` VARCHAR(191) NULL,
    `sentimentScore` INTEGER NULL,
    `productRec` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserCheckIns_email_date_idx`(`email`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
