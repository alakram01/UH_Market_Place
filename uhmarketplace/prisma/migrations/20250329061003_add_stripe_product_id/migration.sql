/*
  Warnings:

  - Made the column `imageUrl` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `stripeProductId` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';
