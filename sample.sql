-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 05, 2013 at 11:25 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sample`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `album_id` int(11) NOT NULL AUTO_INCREMENT,
  `album_title` varchar(45) NOT NULL DEFAULT 'New Album',
  `album_folder` varchar(250) NOT NULL,
  PRIMARY KEY (`album_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `album_title`, `album_folder`) VALUES
(2, 'corona notebook 1', 'corona-notebook-1_album'),
(3, 'business plans', 'business-plans_album'),
(4, 'list your home', 'list-your-home_album'),
(5, 'hcp account', 'hcp-account_album'),
(6, 'refined search', 'refined-search_album'),
(7, 'nationwide listing', 'nationwide-listing_album'),
(8, 'shortlisted', 'shortlisted_album'),
(9, 'care home page', 'care-home-page_album'),
(10, 'password combination', 'password-combination_album'),
(11, 'information classified', 'information-classified_album'),
(12, 'health care provider', 'health-care-provider_album'),
(13, 'comprehensive database', 'comprehensive-database_album'),
(14, 'eldercare', 'eldercare_album'),
(15, 'no validation', 'no-validation_album'),
(16, 'for your love ones', 'for-your-love-ones_album'),
(17, '', '_album');

-- --------------------------------------------------------

--
-- Table structure for table `album_image_sizes`
--

CREATE TABLE IF NOT EXISTS `album_image_sizes` (
  `size_id` int(11) NOT NULL AUTO_INCREMENT,
  `dimensions` varchar(20) NOT NULL,
  `album_id` int(11) NOT NULL,
  PRIMARY KEY (`size_id`),
  KEY `fk_size_album_id` (`album_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `album_image_sizes`
--

INSERT INTO `album_image_sizes` (`size_id`, `dimensions`, `album_id`) VALUES
(2, '900x1024', 2),
(3, '150x500', 2),
(5, '250x300', 3),
(6, '1024x1024', 4),
(7, '1024x1024', 5),
(8, '1024x1024', 6),
(9, '1024x1024', 7),
(10, '1024x1024', 8),
(11, '1024x1024', 9),
(12, '1024x1024', 10),
(13, '1024x1024', 11),
(14, '1024x104', 12),
(15, '104x104', 13),
(16, '1025x1024', 14),
(17, '201x104', 15),
(18, '105x205', 16),
(19, 'x', 17);

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `route_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `article_title` varchar(255) NOT NULL,
  `intro` text,
  `brief` text,
  `approach` text,
  `what_we_did` text,
  `status` enum('published','unpublished') NOT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `link_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `route_id` (`route_id`),
  KEY `article_category_id` (`category_id`),
  KEY `article_subcategory_id` (`subcategory_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`article_id`, `route_id`, `category_id`, `subcategory_id`, `article_title`, `intro`, `brief`, `approach`, `what_we_did`, `status`, `date_created`, `date_updated`, `link_url`) VALUES
(1, 1, 1, NULL, 'test article 10', NULL, NULL, NULL, NULL, 'unpublished', '2013-04-03 02:23:03', '2013-04-05 08:55:58', NULL),
(2, 2, NULL, NULL, 'test article 20', NULL, NULL, NULL, NULL, 'unpublished', '2013-04-03 02:23:13', '2013-04-03 11:00:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_categories`
--

CREATE TABLE IF NOT EXISTS `article_categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_title` varchar(100) NOT NULL,
  `category_url` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_url_UNIQUE` (`category_url`),
  UNIQUE KEY `category_title_UNIQUE` (`category_title`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `article_categories`
--

INSERT INTO `article_categories` (`category_id`, `category_title`, `category_url`) VALUES
(1, 'test category 1', '/test-category');

-- --------------------------------------------------------

--
-- Table structure for table `article_images`
--

CREATE TABLE IF NOT EXISTS `article_images` (
  `article_image_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `used_for` varchar(45) DEFAULT 'gallery',
  PRIMARY KEY (`article_image_id`),
  KEY `fk_article_image_id` (`image_id`),
  KEY `fk_article_images_image` (`image_id`),
  KEY `fk_article_images2` (`article_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `article_images`
--

INSERT INTO `article_images` (`article_image_id`, `article_id`, `image_id`, `used_for`) VALUES
(1, 1, 17, 'gallery');

-- --------------------------------------------------------

--
-- Table structure for table `article_subcategories`
--

CREATE TABLE IF NOT EXISTS `article_subcategories` (
  `subcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `subcategory_title` varchar(100) NOT NULL,
  `subcategory_description` varchar(250) DEFAULT NULL,
  `subcategory_url` varchar(100) NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `subcategory_url_UNIQUE` (`subcategory_url`),
  KEY `FK_subcategory_2` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `article_subcategories`
--

INSERT INTO `article_subcategories` (`subcategory_id`, `category_id`, `subcategory_title`, `subcategory_description`, `subcategory_url`) VALUES
(1, 1, 'subcategory test 1', NULL, '/subcategory-test');

-- --------------------------------------------------------

--
-- Table structure for table `article_tags`
--

CREATE TABLE IF NOT EXISTS `article_tags` (
  `article_id` int(11) NOT NULL,
  `tag` varchar(45) DEFAULT NULL,
  KEY `fk_tags_1` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article_tags`
--

INSERT INTO `article_tags` (`article_id`, `tag`) VALUES
(1, ''),
(2, '');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE IF NOT EXISTS `cart_items` (
  `cart_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(45) NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `fk_cart_item` (`payment_id`),
  KEY `fk_cart_item2` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `enterprise_settings`
--

CREATE TABLE IF NOT EXISTS `enterprise_settings` (
  `settings_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `use_smtp` tinyint(4) NOT NULL DEFAULT '0',
  `smtp_host` varchar(45) NOT NULL,
  `smtp_username` varchar(45) NOT NULL,
  `smtp_pass` varchar(45) NOT NULL,
  `smtp_auth` tinyint(4) NOT NULL DEFAULT '0',
  `smtp_port` varchar(45) NOT NULL,
  `from_email` varchar(45) NOT NULL,
  `from_name` varchar(45) NOT NULL,
  `to_email` varchar(45) NOT NULL,
  `to_name` varchar(45) NOT NULL,
  `google_analytics` text NOT NULL,
  PRIMARY KEY (`settings_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `enterprise_settings`
--

INSERT INTO `enterprise_settings` (`settings_id`, `username`, `password`, `use_smtp`, `smtp_host`, `smtp_username`, `smtp_pass`, `smtp_auth`, `smtp_port`, `from_email`, `from_name`, `to_email`, `to_name`, `google_analytics`) VALUES
(1, 'admin', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, 'mail.starfi.sh', 'mailing@starfi.sh', '4mailing', 0, '25', '', '', 'michael.soriano@starfi.sh', 'LostArch', ' var _gaq = _gaq || [];\r\n  _gaq.push([''_setAccount'', ''UA-35662078-1'']);\r\n  _gaq.push([''_trackPageview'']);\r\n\r\n  (function() {\r\n    var ga = document.createElement(''script''); ga.type = ''text/javascript''; ga.async = true;\r\n    ga.src = (''https:'' == document.location.protocol ? ''https://ssl'' : ''http://www'') + ''.google-analytics.com/ga.js'';\r\n    var s = document.getElementsByTagName(''script'')[0]; s.parentNode.insertBefore(ga, s);\r\n  })();');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `image_title` varchar(45) NOT NULL DEFAULT 'New Photo',
  `image_caption` varchar(500) NOT NULL DEFAULT 'Place caption here.',
  `filename` varchar(120) NOT NULL,
  `filename_ext` varchar(4) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `fk_images_album_id` (`album_id`),
  KEY `fk_images_size_id` (`size_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `album_id`, `size_id`, `image_title`, `image_caption`, `filename`, `filename_ext`, `date_created`) VALUES
(2, 2, 2, 'New Photo', 'table format', 'compare-plans', '.png', '2013-04-02 08:40:25'),
(3, 2, 2, 'New Photo', 'floating boxes', 'FISHR-PHOTO', '.png', '2013-04-02 08:43:20'),
(4, 2, 2, 'New Photo', 'Place caption here.', 'technologies-background', '.jpg', '2013-04-02 08:52:43'),
(5, 2, 3, 'New Photo', 'Place caption here.', 'executives', '.jpg', '2013-04-02 08:53:20'),
(6, 3, 5, 'New Photo', 'Place caption here.', '697x325pixels-04-buffets', '.jpg', '2013-04-02 08:56:38'),
(7, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-1', '.png', '2013-04-03 02:09:18'),
(8, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-2', '.png', '2013-04-03 02:09:18'),
(9, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-3', '.png', '2013-04-03 02:09:18'),
(10, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-4', '.png', '2013-04-03 02:09:18'),
(11, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-5', '.png', '2013-04-03 02:09:18'),
(12, 2, 2, 'New Photo', 'Place caption here.', 'Starfish-Enterprise-V3-6', '.png', '2013-04-03 02:09:18'),
(13, 2, 2, 'New Photo', 'Place caption here.', 'SUBAR_IMPREZA_by_BADH13', '.jpg', '2013-04-03 02:09:18'),
(14, 2, 2, 'New Photo', 'Place caption here.', 'TOYOTA_SUPRA_by_BADH13', '.jpg', '2013-04-03 02:09:19'),
(15, 2, 2, 'New Photo', 'Place caption here.', 'toyota-supra-0', '.jpg', '2013-04-03 02:09:19'),
(16, 2, 2, 'New Photo', 'Place caption here.', 'Toyota-Supra-2014-450x299', '.jpg', '2013-04-03 02:09:19'),
(17, 2, 2, 'New Photo', 'Place caption here.', 'toyota_supra_top_view1', '.jpg', '2013-04-03 02:09:19'),
(18, 4, 6, 'New Photo', 'Place caption here.', '1920', '.jpg', '2013-04-04 06:53:47'),
(19, 5, 7, 'New Photo', 'Place caption here.', 'usic-popup', '.jpg', '2013-04-04 06:54:04'),
(20, 6, 8, 'New Photo', 'Place caption here.', 'hey', '.jpg', '2013-04-04 06:54:39'),
(21, 7, 9, 'New Photo', 'Place caption here.', 'services_03', '.png', '2013-04-04 06:54:58'),
(22, 8, 10, 'New Photo', 'Place caption here.', 'thumbnail7', '.jpg', '2013-04-04 06:55:38'),
(23, 9, 11, 'New Photo', 'Place caption here.', 'Ocean-Front-Villa', '.png', '2013-04-04 06:56:08'),
(24, 10, 12, 'New Photo', 'Place caption here.', 'cabin-in-the-woods-poster', '.jpg', '2013-04-04 06:56:32'),
(25, 11, 13, 'New Photo', 'Place caption here.', 'Untitled-2', '.png', '2013-04-04 06:56:53'),
(26, 12, 14, 'New Photo', 'Place caption here.', 'world_map', '.jpg', '2013-04-04 06:57:03'),
(27, 13, 15, 'New Photo', 'Place caption here.', 'sts_galapagos', '.jpg', '2013-04-04 06:57:20'),
(28, 14, 16, 'New Photo', 'Place caption here.', 'wallpaper-1284143', '.jpg', '2013-04-04 06:58:25'),
(29, 15, 17, 'New Photo', 'Place caption here.', 'Koala', '.jpg', '2013-04-04 06:58:32'),
(30, 16, 18, 'New Photo', 'Place caption here.', 'Penguins', '.jpg', '2013-04-04 06:58:39');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_number` varchar(45) NOT NULL,
  `invoice_number` varchar(45) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `delivery_method` varchar(45) NOT NULL,
  `cart_weight` decimal(10,2) NOT NULL,
  `is_product_tangible` enum('Y','N') NOT NULL,
  `transaction_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment1` (`product_id`),
  KEY `fk_payment2` (`buyer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `route_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `product_title` varchar(45) NOT NULL,
  `description` text,
  `product_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_products_product_categories1` (`category_id`),
  KEY `fk_products_routes1` (`route_id`),
  KEY `fk_products_3` (`subcategory_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `route_id`, `category_id`, `subcategory_id`, `product_title`, `description`, `product_price`, `date_created`, `date_updated`) VALUES
(1, 3, 1, 1, 'test product', '<p>hahah</p>\r\n', 0.00, '2013-04-04', '2013-04-04');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE IF NOT EXISTS `product_categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_title` varchar(100) NOT NULL,
  `category_url` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_title_UNIQUE` (`category_title`),
  UNIQUE KEY `category_url_UNIQUE` (`category_url`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_id`, `category_title`, `category_url`) VALUES
(1, 'test product category', '');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE IF NOT EXISTS `product_images` (
  `product_image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `used_for` varchar(45) NOT NULL DEFAULT 'main_image',
  PRIMARY KEY (`product_image_id`),
  KEY `fk_product_images_images1` (`image_id`),
  KEY `fk_product_images_products1` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`product_image_id`, `image_id`, `product_id`, `used_for`) VALUES
(1, 15, 1, 'gallery'),
(2, 14, 1, 'gallery');

-- --------------------------------------------------------

--
-- Table structure for table `product_subcategories`
--

CREATE TABLE IF NOT EXISTS `product_subcategories` (
  `subcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `subcategory_title` varchar(100) NOT NULL,
  `subcategory_description` varchar(250) NOT NULL,
  `subcategory_url` varchar(100) NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `subcategory_url_UNIQUE` (`subcategory_url`),
  KEY `FK_subcategory_2` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `product_subcategories`
--

INSERT INTO `product_subcategories` (`subcategory_id`, `category_id`, `subcategory_title`, `subcategory_description`, `subcategory_url`) VALUES
(1, 1, 'test product subcategory', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE IF NOT EXISTS `routes` (
  `route_id` int(11) NOT NULL AUTO_INCREMENT,
  `permalink` varchar(45) NOT NULL,
  `page_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `permalink_UNIQUE` (`permalink`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`route_id`, `permalink`, `page_id`) VALUES
(1, 'test-article-1', NULL),
(2, 'test-article-2', NULL),
(3, 'test-product', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE IF NOT EXISTS `user_accounts` (
  `user_account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_role_id` varchar(45) NOT NULL DEFAULT 'admin',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account_id` int(11) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zip` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `phone_extension` varchar(45) NOT NULL,
  `address_type` enum('billing','delivery') NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `fk_user_address_user_accounts1` (`user_account_id`),
  KEY `FK_address_1` (`user_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album_image_sizes`
--
ALTER TABLE `album_image_sizes`
  ADD CONSTRAINT `fk_size_album_id` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_category_id` FOREIGN KEY (`category_id`) REFERENCES `article_categories` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `article_subcategory_id` FOREIGN KEY (`subcategory_id`) REFERENCES `article_subcategories` (`subcategory_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `route_id` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article_images`
--
ALTER TABLE `article_images`
  ADD CONSTRAINT `fk_article_images2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_article_images_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `article_subcategories`
--
ALTER TABLE `article_subcategories`
  ADD CONSTRAINT `FK_subcategory_20` FOREIGN KEY (`category_id`) REFERENCES `article_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article_tags`
--
ALTER TABLE `article_tags`
  ADD CONSTRAINT `fk_tags_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_item` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_item2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_album_id` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_images_size_id` FOREIGN KEY (`size_id`) REFERENCES `album_image_sizes` (`size_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payment1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment2` FOREIGN KEY (`buyer_id`) REFERENCES `user_accounts` (`user_account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_3` FOREIGN KEY (`subcategory_id`) REFERENCES `product_subcategories` (`subcategory_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_product_categories1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_routes1` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_product_images_images1` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_images_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `product_subcategories`
--
ALTER TABLE `product_subcategories`
  ADD CONSTRAINT `FK_subcategory_2` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FK_address_1` FOREIGN KEY (`user_account_id`) REFERENCES `user_accounts` (`user_account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
