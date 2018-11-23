# Api nodejs 
# Install package
Run `npm install`

# Run api
Run `npm run start`

# Database
Run `cp .env.example .env`

Run Sql query
```
create database todo;
use todo;
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `email` varchar(191) unique not null,
    `avatar` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `status` tinyint(1) DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (name, status, email) VALUES ('Einar Randall ', 1, 'aniya.wehner@example.org');
INSERT INTO `users` (name, status, email) VALUES ('Ebbe Gemariah', 0, '	gottlieb.monserrat@example.com');
INSERT INTO `users` (name, status, email) VALUES ('Yiorgos Avraamu', 0, 'gottlieb.monserrat1@example.com');
INSERT INTO `users` (name, status, email) VALUES ('Aulus Agmundr', 1, 'gottlieb.monserrat2@example.com');
```
