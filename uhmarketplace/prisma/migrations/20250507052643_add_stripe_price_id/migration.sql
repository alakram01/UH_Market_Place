/*
  Warnings:

  - You are about to drop the `usercheckins` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `stripePriceId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `usercheckins`;
