-- MySQL dump 10.13  Distrib 5.7.25, for osx10.14 (x86_64)
--
-- Host: localhost    Database: troy_db
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addressdata`
--

DROP TABLE IF EXISTS `addressdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cointypedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `coinname` varchar(10) NOT NULL,
  `comment` varchar(30) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2056 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `benefitdata`
--

DROP TABLE IF EXISTS `benefitdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `benefitdata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_type` int(1) NOT NULL,
  `b_value` decimal(12,2) NOT NULL,
  `b_type_f` int(1) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `blocknum`
--

DROP TABLE IF EXISTS `blocknum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blocknum` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `nettype` varchar(10) NOT NULL COMMENT '网络类型',
  `blocknumber` varchar(20) NOT NULL COMMENT '最新区块高度',
  `timestamps` varchar(20) NOT NULL COMMENT '最后写入时间',
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailcode`
--

DROP TABLE IF EXISTS `emailcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailcode` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `timestamps` varchar(20) NOT NULL COMMENT '最后写入时间',
  `code` varchar(60) NOT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ethdatas`
--

DROP TABLE IF EXISTS `ethdatas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ethdatas` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `txhash` varchar(150) NOT NULL COMMENT 'hash',
  `blocknumber` varchar(20) NOT NULL COMMENT '区块高度',
  `state` int(1) NOT NULL,
  `valuex` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ethdeposit`
--

DROP TABLE IF EXISTS `ethdeposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ethdeposit` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `txhash` varchar(150) NOT NULL COMMENT 'hash',
  `timestamps` varchar(20) NOT NULL COMMENT '开始时间',
  `endtime` varchar(20) NOT NULL COMMENT '结束时间',
  `state` varchar(1) NOT NULL COMMENT '状态',
  `valuex` varchar(30) NOT NULL COMMENT '提现金额',
  `address` varchar(50) NOT NULL COMMENT '地址',
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ethusers`
--

DROP TABLE IF EXISTS `ethusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ethusers` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL COMMENT '地址',
  `timestamps` varchar(15) NOT NULL COMMENT '时间',
  `endtime` varchar(15) NOT NULL COMMENT '时间',
  `state` int(2) NOT NULL COMMENT '状态',
  `path` varchar(50) NOT NULL,
  `mnemonic` varchar(150) NOT NULL,
  `valuex` decimal(10,4) NOT NULL,
  `privates` varchar(100) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ethwithdraw`
--

DROP TABLE IF EXISTS `ethwithdraw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ethwithdraw` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `txhash` varchar(150) NOT NULL COMMENT 'hash',
  `timestamps` varchar(20) NOT NULL COMMENT '开始时间',
  `endtime` varchar(20) NOT NULL COMMENT '结束时间',
  `state` varchar(1) NOT NULL COMMENT '状态',
  `valuex` varchar(30) NOT NULL COMMENT '提现金额',
  `address` varchar(50) NOT NULL COMMENT '地址',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `etzadmin`
--

DROP TABLE IF EXISTS `etzadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etzadmin` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(20) NOT NULL,
  `invite_code` varchar(20) NOT NULL,
  `usd_value` decimal(8,2) NOT NULL,
  `last_login_time` varchar(20) NOT NULL,
  `last_login_ip` varchar(20) NOT NULL,
  `regist_time` varchar(20) NOT NULL,
  `update_time` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `isInveted` int(1) NOT NULL,
  `invite2_code` int(6) NOT NULL,
  `node_member` int(8) NOT NULL,
  `isNew` int(1) NOT NULL,
  `totalInvetDay` decimal(12,2) NOT NULL,
  `totalStaticBenefit` decimal(12,2) NOT NULL,
  `staticBenefitDay` decimal(12,2) NOT NULL,
  `teamMember` int(8) NOT NULL,
  `teamInvet` decimal(12,2) NOT NULL,
  `type_1_total` decimal(12,2) NOT NULL,
  `type_2_total` decimal(12,2) NOT NULL,
  `type_3_total` decimal(12,2) NOT NULL,
  `type_4_total` decimal(12,2) NOT NULL,
  `role` int(1) NOT NULL,
  `trade_pwd_origin` varchar(60) NOT NULL,
  `login_pwd_origin` varchar(60) NOT NULL,
  `etz_value` decimal(8,2) NOT NULL,
  `iscalculte` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `financedata`
--

DROP TABLE IF EXISTS `financedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_type` int(1) NOT NULL,
  `f_value` decimal(12,2) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `f_benefit_time` varchar(45) NOT NULL,
  `f_finance_time` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL,
  `end_time` varchar(20) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2067 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `financedetail`
--

DROP TABLE IF EXISTS `financedetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financedetail` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_type_id` int(3) NOT NULL,
  `time_limit` int(5) NOT NULL,
  `day_benefit` decimal(3,2) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2055 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nodebenefitdata`
--

DROP TABLE IF EXISTS `nodebenefitdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodebenefitdata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_value` decimal(12,2) NOT NULL,
  `b_type_f` int(1) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `noticedata`
--

DROP TABLE IF EXISTS `noticedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_type` varchar(30) NOT NULL,
  `notice_comment` text NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pricedata`
--

DROP TABLE IF EXISTS `pricedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricedata` (
  `symbol` varchar(20) NOT NULL,
  `rank` int(5) NOT NULL,
  `price_usd` varchar(30) NOT NULL,
  `price_btc` varchar(30) NOT NULL,
  `available_supply` varchar(30) NOT NULL,
  `total_supply` varchar(30) NOT NULL,
  `last_updated` varchar(15) NOT NULL,
  `market_cap_btc` varchar(20) NOT NULL,
  `market_cap_usd` varchar(30) NOT NULL,
  `id` varchar(50) NOT NULL,
  `max_supply` varchar(30) DEFAULT NULL,
  `percent_change_24h` decimal(8,2) DEFAULT NULL,
  `percent_change_1h` decimal(8,2) DEFAULT NULL,
  `percent_change_7d` decimal(8,2) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `version` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ratedata`
--

DROP TABLE IF EXISTS `ratedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `rate` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2238 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-27 15:49:21
