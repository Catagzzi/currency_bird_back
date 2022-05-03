-- Use this query to create the table user
CREATE TABLE IF NOT EXISTS `user`(
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    sex enum('FEMALE','MALE','NON_BINARY') NOT NULL,
    referral_link CHAR(36) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(referral_link),
    UNIQUE(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Use this query to create the table referral
CREATE TABLE IF NOT EXISTS `referral`(
    id BIGINT NOT NULL AUTO_INCREMENT,
    user BIGINT NOT NULL,
    referred_quantity BIGINT NOT NULL,
    total BIGINT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
