-- AlterTable
ALTER TABLE `duplas` ADD COLUMN `id_picture` INTEGER NULL;

-- CreateTable
CREATE TABLE `Pictures` (
    `id_picture` INTEGER NOT NULL AUTO_INCREMENT,
    `path_url` VARCHAR(150) NULL,

    PRIMARY KEY (`id_picture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Duplas` ADD CONSTRAINT `Duplas_id_picture_fkey` FOREIGN KEY (`id_picture`) REFERENCES `Pictures`(`id_picture`) ON DELETE SET NULL ON UPDATE CASCADE;
