/*
  Warnings:

  - You are about to drop the column `listed` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `passwordreset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `passwordreset` DROP FOREIGN KEY `PasswordReset_userId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `listed`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    DROP COLUMN `hashedPassword`;

-- DropTable
DROP TABLE `passwordreset`;

-- DropTable
DROP TABLE `verificationtoken`;

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

-- AddForeignKey
ALTER TABLE `UserCheckIns` ADD CONSTRAINT `UserCheckIns_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
