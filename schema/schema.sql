CREATE TABLE `Item` (
  `name` VARCHAR(84) NOT NULL,
  `description` TEXT,
  `source_image` VARCHAR(84),
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Sub_Item` (
  `item_id` BIGINT NOT NULL,
  `name` VARCHAR(84) NOT NULL,
  `description` TEXT,
  `source_image` VARCHAR(84),
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `User` (
  `email` VARCHAR(84) UNIQUE NOT NULL COMMENT 'used as login',
  `name` VARCHAR(84) NOT NULL,
  `password` VARCHAR(128) NOT NULL COMMENT 'SHA512',
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Personal_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(11) UNIQUE NOT NULL COMMENT 'cpf',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Company_User_Spec` (
  `user_id` BIGINT PRIMARY KEY,
  `national_identity` VARCHAR(14) UNIQUE NOT NULL COMMENT 'cnpj',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Point` (
  `user_id` BIGINT NOT NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  `changed_by` BIGINT,
  `deleted_by` BIGINT,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Collect_Point_Spec` (
  `point_id` BIGINT PRIMARY KEY,
  `changed_by` BIGINT,
  `deleted_by` BIGINT,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Delivery_Point_Spec` (
  `point_id` BIGINT PRIMARY KEY,
  `description` TEXT,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Point_Item` (
  `point_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `collected_by` BIGINT,
  `collected_time` TIMESTAMP,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Point_Sub_Item` (
  `point_item_id` BIGINT NOT NULL,
  `sub_item_id` BIGINT NOT NULL,
  `collected_by` BIGINT,
  `collected_time` TIMESTAMP,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Health_Check` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Health_Check_Spec` (
  `health_check_id` BIGINT PRIMARY KEY,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
);

CREATE TABLE `Health_Check_Child` (
  `health_check_id` BIGINT NOT NULL,
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `identifier` VARCHAR(32) NOT NULL COMMENT 'used in DTO',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `changed_time` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_time` TIMESTAMP
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

ALTER TABLE `Health_Check_Spec` ADD FOREIGN KEY (`health_check_id`) REFERENCES `Health_Check` (`id`);

ALTER TABLE `Health_Check_Child` ADD FOREIGN KEY (`health_check_id`) REFERENCES `Health_Check` (`id`);
