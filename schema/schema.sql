DROP DATABASE IF EXISTS sf;

CREATE DATABASE sf;

USE sf;

CREATE TABLE `Item` (
  `name` VARCHAR(84) NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `User` (
  `email` VARCHAR(84) UNIQUE NOT NULL COMMENT 'used as login',
  `name` VARCHAR(84) NOT NULL,
  `password` VARCHAR(128) NOT NULL COMMENT 'ARGON2',
  `preferences` JSON NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Personal_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(11) UNIQUE NOT NULL COMMENT 'cpf'
);

CREATE TABLE `Company_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(14) UNIQUE NOT NULL COMMENT 'cnpj'
);

CREATE TABLE `Point` (
  `user_id` BIGINT NOT NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  `changed_by` BIGINT,
  `deleted_by` BIGINT,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Delivery_Point_Spec` (
  `point_id` BIGINT PRIMARY KEY,
  `description` TEXT
);

CREATE TABLE `Point_Item` (
  `point_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `collected_by` BIGINT,
  `collected_time` TIMESTAMP,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Health_Check` (
  `id` INT PRIMARY KEY AUTO_INCREMENT
);

ALTER TABLE `Personal_User_Spec` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Company_User_Spec` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`changed_by`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`deleted_by`) REFERENCES `User` (`id`);

ALTER TABLE `Delivery_Point_Spec` ADD FOREIGN KEY (`point_id`) REFERENCES `Point` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`point_id`) REFERENCES `Point` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`item_id`) REFERENCES `Item` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`collected_by`) REFERENCES `User` (`id`);

INSERT INTO `Item` (`name`, `id`) VALUES
  ('Papel', '1'), ('Vidro', '2'), ('Lata de alumínio', '3'), ('Embalagem PET', '4'), ('Lata de aço', '5'),
  ('Embalagem longa vida', '6'), ('Ferro', '7'), ('Pilha', '8'), ('Bateria', '9'), ('Óleo de cozinha', '10'),
  ('Eletroeletrônico', '11'), ('Pneu', '12');
