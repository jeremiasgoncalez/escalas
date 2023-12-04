-- CreateTable
CREATE TABLE `Funcionarios` (
    `id_funcionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `id_dupla` INTEGER NULL,

    PRIMARY KEY (`id_funcionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duplas` (
    `id_dupla` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_dupla` VARCHAR(30) NOT NULL,
    `anotacoes` VARCHAR(60) NULL,

    PRIMARY KEY (`id_dupla`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Funcionarios` ADD CONSTRAINT `Funcionarios_id_dupla_fkey` FOREIGN KEY (`id_dupla`) REFERENCES `Duplas`(`id_dupla`) ON DELETE SET NULL ON UPDATE CASCADE;
