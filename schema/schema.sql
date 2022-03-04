DROP TABLE IF EXISTS `Item`;
CREATE TABLE `Item` (
  `name` VARCHAR(84) NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT
);

DROP TABLE IF EXISTS `Sub_Item`;
CREATE TABLE `Sub_Item` (
  `item_id` BIGINT NOT NULL,
  `name` VARCHAR(84) NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT
);

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `email` VARCHAR(84) UNIQUE NOT NULL COMMENT 'used as login',
  `name` VARCHAR(84) NOT NULL,
  `password` VARCHAR(128) NOT NULL COMMENT 'ARGON2',
  `preferences` JSON NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP()),
  `changed_time` TIMESTAMP ON UPDATE (CURRENT_TIMESTAMP()),
  `deleted_time` TIMESTAMP
);

DROP TABLE IF EXISTS `Personal_User_Spec`;
CREATE TABLE `Personal_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(11) UNIQUE NOT NULL COMMENT 'cpf'
);

DROP TABLE IF EXISTS `Company_User_Spec`;
CREATE TABLE `Company_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(14) UNIQUE NOT NULL COMMENT 'cnpj'
);

DROP TABLE IF EXISTS `Point`;
CREATE TABLE `Point` (
  `user_id` BIGINT NOT NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  `changed_by` BIGINT,
  `deleted_by` BIGINT,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP()),
  `changed_time` TIMESTAMP ON UPDATE (CURRENT_TIMESTAMP()),
  `deleted_time` TIMESTAMP
);

DROP TABLE IF EXISTS `Collect_Point_Spec`;
CREATE TABLE `Collect_Point_Spec` (
  `point_id` BIGINT PRIMARY KEY,
  `changed_by` BIGINT,
  `deleted_by` BIGINT
);

DROP TABLE IF EXISTS `Delivery_Point_Spec`;
CREATE TABLE `Delivery_Point_Spec` (
  `point_id` BIGINT PRIMARY KEY,
  `description` TEXT
);

DROP TABLE IF EXISTS `Point_Item`;
CREATE TABLE `Point_Item` (
  `point_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `collected_by` BIGINT,
  `collected_time` TIMESTAMP,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP()),
  `changed_time` TIMESTAMP ON UPDATE (CURRENT_TIMESTAMP()),
  `deleted_time` TIMESTAMP
);

DROP TABLE IF EXISTS `Point_Sub_Item`;
CREATE TABLE `Point_Sub_Item` (
  `point_item_id` BIGINT NOT NULL,
  `sub_item_id` BIGINT NOT NULL,
  `collected_by` BIGINT,
  `collected_time` TIMESTAMP,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) UNIQUE NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP()),
  `changed_time` TIMESTAMP ON UPDATE (CURRENT_TIMESTAMP()),
  `deleted_time` TIMESTAMP
);

DROP TABLE IF EXISTS `Health_Check`;
CREATE TABLE `Health_Check` (
  `id` INT PRIMARY KEY AUTO_INCREMENT
);

ALTER TABLE `Sub_Item` ADD FOREIGN KEY (`item_id`) REFERENCES `Item` (`id`);

ALTER TABLE `Personal_User_Spec` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Company_User_Spec` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`changed_by`) REFERENCES `User` (`id`);

ALTER TABLE `Point` ADD FOREIGN KEY (`deleted_by`) REFERENCES `User` (`id`);

ALTER TABLE `Collect_Point_Spec` ADD FOREIGN KEY (`point_id`) REFERENCES `Point` (`id`);

ALTER TABLE `Collect_Point_Spec` ADD FOREIGN KEY (`changed_by`) REFERENCES `User` (`id`);

ALTER TABLE `Collect_Point_Spec` ADD FOREIGN KEY (`deleted_by`) REFERENCES `User` (`id`);

ALTER TABLE `Delivery_Point_Spec` ADD FOREIGN KEY (`point_id`) REFERENCES `Point` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`point_id`) REFERENCES `Point` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`item_id`) REFERENCES `Item` (`id`);

ALTER TABLE `Point_Item` ADD FOREIGN KEY (`collected_by`) REFERENCES `User` (`id`);

ALTER TABLE `Point_Sub_Item` ADD FOREIGN KEY (`point_item_id`) REFERENCES `Point_Item` (`id`);

ALTER TABLE `Point_Sub_Item` ADD FOREIGN KEY (`sub_item_id`) REFERENCES `Sub_Item` (`id`);

ALTER TABLE `Point_Sub_Item` ADD FOREIGN KEY (`collected_by`) REFERENCES `User` (`id`);

INSERT INTO `Item` (`name`, `id`) VALUES
  ('Papel', '1'), ('Vidro', '2'), ('Lata de alumínio', '3'), ('Embalagem PET', '4'), ('Lata de aço', '5'),
  ('Embalagem longa vida', '6'), ('Ferro', '7'), ('Pilha', '8'), ('Bateria', '9'), ('Óleo de cozinha', '10'),
  ('Eletroeletrônico', '11');

INSERT INTO `Sub_Item` (`item_id`, `name`, `id`) VALUES
  ('1', 'Revista', '1'), ('1', 'Caderno', '2'), ('1', 'Jornal', '3'), ('1', 'Cartaz', '4'), ('1', 'Caixa de papelão', '5'),
  ('1', 'Envelope', '6'), ('2', 'Garrafa de bebida', '7'), ('2', 'Pote', '8'), ('2', 'Copo', '9'), ('2', 'Prato', '10'),
  ('2', 'Tubo de TV', '11'), ('2', 'Lâmpada incandescente', '12'), ('2', 'Vidro de janela', '13'), ('2', 'Vidro de automóvel', '14'),
  ('3', 'Cerveja', '15'), ('3', 'Refrigerante', '16'), ('3', 'Bicicleta', '17'), ('4', 'Garrafa', '18'), ('4', 'Frasco', '19'),
  ('4', 'Pote', '20'), ('5', 'Comida', '21'), ('5', 'Tinta', '22'), ('6', 'Leite', '23'), ('6', 'Suco', '24'), ('6', 'Molho', '25'),
  ('6', 'Sopa', '26'), ('7', 'Compressor', '27'), ('7', 'Panela', '28'), ('11', 'Geladeira', '29'), ('11', 'Freezer', '30'),
  ('11', 'Fogão', '31'), ('11', 'Máquina de lavar roupas', '32'), ('11', 'Micro-ondas', '33'), ('11', 'Cafeteira', '34'), ('11', 'Secador de cabelos', '35'),
  ('11', 'Televisão', '36'), ('11', 'Aparelho de home-theater', '37'), ('11', 'Ventilador', '38'), ('11', 'Ventilador', '39'), ('11', 'Aspirador de pó', '40'),
  ('11', 'Amolador', '41'), ('11', 'Aquecedor', '42'), ('11', 'Bebedouro', '43'), ('11', 'Purificador de água', '44'), ('11', 'Centrífuga', '45'),
  ('11', 'Liquidificador', '46'), ('11', 'Multriprocessador', '47'), ('11', 'Ferro de passar', '48'), ('11', 'Panela', '49'), ('11', 'Sanduicheira', '50'),
  ('11', 'Máquina de costura', '51'), ('11', 'Máquina de bordar', '52'), ('11', 'Purificador de ar', '53'), ('11', 'Vaporizador', '54'), ('11', 'Fritadeira', '55'),
  ('11', 'Pipoqueira', '56'), ('11', 'Panificadora', '57'), ('11', 'Mixer', '58');