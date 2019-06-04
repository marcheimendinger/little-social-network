# ************************************************************
# Sequel Pro SQL dump
# Version 5438
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: projet_transversal_1_tests
# Generation Time: 2019-06-04 13:19:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table friends
# ------------------------------------------------------------

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `user_one_id` int(11) unsigned NOT NULL,
  `user_two_id` int(11) unsigned NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_one_id`,`user_two_id`),
  KEY `friends_friend` (`user_two_id`),
  CONSTRAINT `friends_friend` FOREIGN KEY (`user_two_id`) REFERENCES `users` (`id`),
  CONSTRAINT `friends_user` FOREIGN KEY (`user_one_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;

INSERT INTO `friends` (`user_one_id`, `user_two_id`, `created`, `accepted`)
VALUES
	(1,2,'2019-06-04 13:55:09',1),
	(1,4,'2019-06-04 13:58:18',0),
	(5,1,'2019-06-04 13:58:42',0),
	(6,1,'2019-06-04 13:59:15',1);

/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `content` text NOT NULL,
  `tone` varchar(50) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `posts_user` (`user_id`),
  CONSTRAINT `posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table shares
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shares`;

CREATE TABLE `shares` (
  `user_id` int(11) unsigned NOT NULL,
  `post_id` int(11) unsigned NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `shares_post` (`post_id`),
  CONSTRAINT `shares_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `shares_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(32) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `description` text,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `birth_date`, `gender`, `location`, `description`, `created`)
VALUES
	(1,'admin','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','admin','admin','admin@test.com','2000-01-01','m',NULL,NULL,'2019-06-04 11:11:34'),
	(2,'friend','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','friend','friend','friend@test.com',NULL,NULL,NULL,NULL,'2019-06-04 13:54:09'),
	(3,'notfriend','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','notfriend','notfriend','notfriend@test.com',NULL,NULL,NULL,NULL,'2019-06-04 13:55:35'),
	(4,'pendingfriend','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','pendingfriend','pendingfriend','pendingfriend@test.com',NULL,NULL,NULL,NULL,'2019-06-04 13:57:38'),
	(5,'pendingfriend2','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','pendingfriend2','pendingfriend2','pendingfriend2@test.com',NULL,NULL,NULL,NULL,'2019-06-04 13:57:38'),
	(6,'friend2','$2b$10$hQzTmw6TrkiN5UMl/dCLmev58TTxtofd4FOTjlxbR7tqrKnSuM1..','friend2','friend2','friend2@test.com',NULL,NULL,NULL,NULL,'2019-06-04 13:59:05');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
