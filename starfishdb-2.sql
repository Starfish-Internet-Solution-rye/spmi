-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 26, 2013 at 10:56 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `starfishdb`
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `album_title`, `album_folder`) VALUES
(1, 'Sample', 'Sample_album');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `album_image_sizes`
--

INSERT INTO `album_image_sizes` (`size_id`, `dimensions`, `album_id`) VALUES
(1, '230x200', 1);

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
  `status` enum('published','unpublished') NOT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `link_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `route_id` (`route_id`),
  KEY `article_category_id` (`category_id`),
  KEY `article_subcategory_id` (`subcategory_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`article_id`, `route_id`, `category_id`, `subcategory_id`, `article_title`, `status`, `date_created`, `date_updated`, `link_url`) VALUES
(32, 44, 7, 1, 'sampolis', 'unpublished', '2013-03-13 18:56:13', '2013-04-26 12:51:11', NULL),
(33, 45, 7, 1, 'artcless', 'unpublished', '2013-03-13 18:58:53', '2013-03-13 18:58:53', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `article_categories`
--

INSERT INTO `article_categories` (`category_id`, `category_title`, `category_url`) VALUES
(1, 'Title One', 'title-one'),
(6, 'dasdasda', '/dasdasda'),
(7, 'category three', '/category-three'),
(8, 'sample two three', ''),
(9, 'Sample', '/sample');

-- --------------------------------------------------------

--
-- Table structure for table `article_elements`
--

CREATE TABLE IF NOT EXISTS `article_elements` (
  `article_element_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `article_element_content` text NOT NULL,
  `article_element_type` enum('text','image') NOT NULL DEFAULT 'text',
  `article_element_position` int(11) NOT NULL,
  PRIMARY KEY (`article_element_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1132343 ;

--
-- Dumping data for table `article_elements`
--

INSERT INTO `article_elements` (`article_element_id`, `article_id`, `article_element_content`, `article_element_type`, `article_element_position`) VALUES
(1132340, 32, '<p>dasdas</p>\r\n', 'text', 0),
(1132341, 32, '<p>adasdasdas</p>\r\n', 'text', 0),
(1132342, 32, '1', 'image', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `article_images`
--


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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `article_subcategories`
--

INSERT INTO `article_subcategories` (`subcategory_id`, `category_id`, `subcategory_title`, `subcategory_description`, `subcategory_url`) VALUES
(1, 7, 'adasdsa', NULL, '/adasdsa'),
(2, 6, 'sample sub categeoidadoj', NULL, ''),
(10, 1, 'uiuiuio', NULL, '/uiuiuio');

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
(32, '');

-- --------------------------------------------------------

--
-- Table structure for table `article_texts`
--

CREATE TABLE IF NOT EXISTS `article_texts` (
  `article_texts_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`article_texts_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `article_texts`
--


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

--
-- Dumping data for table `cart_items`
--


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
(1, 'agl', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, 'mail.starfi.sh', 'mailing@starfi.sh', '4mailing', 1, '26', '', '', 'michael.soriano@starfi.sh', 'LostArch', ' var _gaq = _gaq || [];\r\n  _gaq.push([''_setAccount'', ''UA-35662078-1'']);\r\n  _gaq.push([''_trackPageview'']);\r\n\r\n  (function() {\r\n    var ga = document.createElement(''script''); ga.type = ''text/javascript''; ga.async = true;\r\n    ga.src = (''https:'' == document.location.protocol ? ''https://ssl'' : ''http://www'') + ''.google-analytics.com/ga.js'';\r\n    var s = document.getElementsByTagName(''script'')[0]; s.parentNode.insertBefore(ga, s);\r\n  })();');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `album_id`, `size_id`, `image_title`, `image_caption`, `filename`, `filename_ext`, `date_created`) VALUES
(1, 1, 1, 'New Photo', 'Place caption here.', 'accessories_bg', '.jpg', '2013-04-26 08:46:10');

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

--
-- Dumping data for table `payments`
--


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `products`
--


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `product_categories`
--


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `product_images`
--


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `product_subcategories`
--


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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`route_id`, `permalink`, `page_id`) VALUES
(37, 'hello', NULL),
(39, 'sample-article', NULL),
(41, 'sampol', NULL),
(43, 'sampols', NULL),
(44, 'sampolis', NULL),
(45, 'artcless', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`user_account_id`, `username`, `password`, `user_role_id`, `last_login`) VALUES
(1, 'user', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 'admin', '2013-03-14 10:53:40');

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
-- Dumping data for table `user_address`
--


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
