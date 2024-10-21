CREATE TABLE `posts`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `author_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `blogdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_published` BOOLEAN NOT NULL DEFAULT '1'
);
ALTER TABLE
    `posts` ADD INDEX `posts_author_id_index`(`author_id`);
CREATE TABLE `authors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `authors` ADD UNIQUE `authors_username_unique`(`username`);
ALTER TABLE
    `posts` ADD CONSTRAINT `posts_author_id_foreign` FOREIGN KEY(`author_id`) REFERENCES `authors`(`id`);

INSERT INTO authors (username,password,full_name) VALUES ('admin','admin','admin');   

INSERT INTO posts (author_id,title,content) VALUES (1,'testPost','lorem ipsum lorem ipsum');
INSERT INTO posts (author_id,title,content) VALUES (1,'second testPost','lorem ipsum lorem ipsum');