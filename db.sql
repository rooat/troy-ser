-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: troy_db
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

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
CREATE TABLE `addressdata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_type` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `comment` varchar(50) NOT NULL,
  `state` int(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2058 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addressdata`
--

LOCK TABLES `addressdata` WRITE;
/*!40000 ALTER TABLE `addressdata` DISABLE KEYS */;
INSERT INTO `addressdata` VALUES (2052,'eth','0x23e48fd0f704309ed6d7c7a57cdf45625c09afe3','hegkdk',0,12,'2019-6-25 16:58:8'),(2053,'eth','0x23e48fd0f704309ed6d7c7a57cdf45625c09afe2','hegkdk',0,12,'2019-6-26 11:54:34'),(2054,'eth','0x23e48fd0f704309ED6D7c7A57CdF45625C09dFe2','hegkdk',0,12,'2019-6-26 19:53:12'),(2055,'eth','0x23e48fd0f704309ED6D7c7A57CdF45625C09dF32','hegkdk',0,12,'2019-6-27 14:8:8'),(2056,'eth','0x21e48fd0f704309ED6D7c7A57CdF45625C09dF32','hegkdk',0,12,'1561796786298'),(2057,'ETZ','0x28a1a5f647c5c9686eF460b8447A5C88fdaC96c9','TEST',0,12,'1561796848290');
/*!40000 ALTER TABLE `addressdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefitdata`
--

DROP TABLE IF EXISTS `benefitdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `benefitdata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_type` int(3) NOT NULL,
  `b_value` decimal(18,7) NOT NULL,
  `b_type_f` int(1) NOT NULL,
  `timestamps` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `f_id` int(11) NOT NULL,
  `operate` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefitdata`
--

LOCK TABLES `benefitdata` WRITE;
/*!40000 ALTER TABLE `benefitdata` DISABLE KEYS */;
INSERT INTO `benefitdata` VALUES (105,1,0.0050000,0,'1562112000000',12,2056,0),(106,1,0.0050000,0,'1562112000000',12,2057,0),(107,1,0.0050000,0,'1562112000000',12,2058,0),(108,1,0.0050000,0,'1562112000000',12,2059,0),(109,1,0.0050000,0,'1562112000000',12,2060,0),(110,1,0.0050000,0,'1562112000000',12,2061,0),(111,1,0.0050000,0,'1562112000000',12,2062,0),(112,1,0.0050000,0,'1562112000000',12,2056,0),(113,1,0.0050000,0,'1562112000000',12,2057,0),(114,1,0.0050000,0,'1562112000000',12,2058,0),(115,1,0.0050000,0,'1562112000000',12,2059,0),(116,1,0.0050000,0,'1562112000000',12,2060,0),(117,1,0.0050000,0,'1562112000000',12,2061,0),(118,1,0.0050000,0,'1562112000000',12,2062,0),(119,1,0.0050000,0,'1562112000000',12,2056,0),(120,1,0.0050000,0,'1562112000000',12,2057,0),(121,1,0.0050000,0,'1562112000000',12,2058,0),(122,1,0.0050000,0,'1562112000000',12,2059,0),(123,1,0.0050000,0,'1562112000000',12,2060,0),(124,1,0.0050000,0,'1562112000000',12,2061,0),(125,1,0.0050000,0,'1562112000000',12,2062,0),(126,1,0.0050000,0,'1562112000000',12,2056,0),(127,1,0.0050000,0,'1562112000000',12,2057,0),(128,1,0.0050000,0,'1562112000000',12,2058,0),(129,1,0.0050000,0,'1562112000000',12,2059,0),(130,1,0.0050000,0,'1562112000000',12,2060,0),(131,1,0.0050000,0,'1562112000000',12,2061,0),(132,1,0.0050000,0,'1562112000000',12,2062,0),(133,1,0.0050000,0,'1562112000000',12,2056,0),(134,1,0.0050000,0,'1562112000000',12,2057,0),(135,1,0.0050000,0,'1562112000000',12,2063,0),(136,1,0.0050000,0,'1562112000000',12,2064,0),(137,1,0.0050000,0,'1562112000000',12,2065,0),(138,1,0.0050000,0,'1562112000000',12,2066,0),(139,1,0.0050000,0,'1562112000000',12,2067,0);
/*!40000 ALTER TABLE `benefitdata` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=36081 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cointypedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cointypedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `coinname` varchar(10) NOT NULL,
  `comment` varchar(30) NOT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2057 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cointypedata`
--

LOCK TABLES `cointypedata` WRITE;
/*!40000 ALTER TABLE `cointypedata` DISABLE KEYS */;
INSERT INTO `cointypedata` VALUES (2056,'ETZ','Etherzero',0);
/*!40000 ALTER TABLE `cointypedata` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `emailcode`
--

LOCK TABLES `emailcode` WRITE;
/*!40000 ALTER TABLE `emailcode` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailcode` ENABLE KEYS */;
UNLOCK TABLES;

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
  `fromadd` varchar(50) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ethdatas`
--

LOCK TABLES `ethdatas` WRITE;
/*!40000 ALTER TABLE `ethdatas` DISABLE KEYS */;
INSERT INTO `ethdatas` VALUES (106,'0xe7b0ed5af47beb2f2fdb5f39705a0f9aaf2ec760ddaaef332728dfeace76d9fe','19043395',1,'100000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(107,'0x40d4876f8624ffd9c2f2ad3e0448d8521dcf0f2a24d5bf3686f8fb9e55aea6c7','19043426',1,'1000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(108,'0xf9855133e6cdc72c030b6f7d51e6bedc773459675f363582ffb1606c6c7cafdc','19047061',1,'10000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(109,'0xa76bf9849a4469245739448a0de6d32e1d58a4506b9b1b84b4dc3f8369447f6d','19048340',1,'10000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(110,'0x51165909ac32fc8dae29d3c6e45474b385edf24f5ec8bdb991e8f4b43956cce3','19048747',1,'1000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(111,'0x677a892d0f07cc072b8601756ba8f08254f53da2832892945ff4327493228079','19048874',1,'10000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(112,'0x7600634774ca0f4d1e3bbcb428ae0b4dcb360722dcf0ae87f0a94864c00d7bdd','19049486',1,'5000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(113,'0x01b2ddd763305081e9dd63851426a41e45dce24f03be56340ef872801a8a8888','19049718',1,'4000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(114,'0x1c683fcdade6a8fcb10a7e1bd9dd0363152fc0e483894231ba8fd9bdf4ea35ea','19051012',1,'12000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(115,'0xc17963499e741cd5d293fa51998b65e2c127cc5e8f61b1742c001e08a5f3f87b','19051216',1,'5000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(116,'0xb3da96a0e4a8493d1936525218b0dc2192bc5980f457d8fd145bad6323360dc9','19051428',1,'2000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(117,'0xc601694f95e41b077b85241936b4d5cfcc6917324aa316753389cd888d266dff','19347329',1,'10000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(118,'0xf6b8fa12d2b0d83c7bf9ab4768612a293628fcaa4b54d8f107ba4d04fb1b876f','19347451',1,'10000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(119,'0x81ab34a57e5e8edf56bac2c8489492c8e2f96e343e3c208b20eb50662a5db4a8','19347940',1,'10000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(120,'0x5a1837c77a6e6828937aa5acb46cbf0ac3cbb7fa18bedf0d781c0ea4972400ae','19348119',1,'10000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(121,'0x813b065600d0800b2b1fe4879671deef3d4618e5376a9f6571ff4f7c4c63d040','19348163',1,'1000000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1560851231208','0x7341b60bae20dc8F2a86D4ebd065959DD9bB5e5c'),(122,'0x71473f7fe36957b244888ce50b0873d7f473f15019de4c4139ea94dddacdfc9e','19918190',1,'100000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1561973236727','0x65e7801bd4b036081dae9280ec1b156b39d11af5'),(123,'0x1893d7d03a24cfafc4e3e599fb10fa91b860ad6a8d8afaf3c45ebeed6a399e20','19918223',1,'10000000000000000','0xe5a253043be58a0233a41150c00f60fdeb25c443','1561973283871','0x65e7801bd4b036081dae9280ec1b156b39d11af5');
/*!40000 ALTER TABLE `ethdatas` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `ethdeposit`
--

LOCK TABLES `ethdeposit` WRITE;
/*!40000 ALTER TABLE `ethdeposit` DISABLE KEYS */;
/*!40000 ALTER TABLE `ethdeposit` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ethusers`
--

LOCK TABLES `ethusers` WRITE;
/*!40000 ALTER TABLE `ethusers` DISABLE KEYS */;
INSERT INTO `ethusers` VALUES (348,'0xe5a253043be58a0233a41150c00f60fdeb25c443','1560833225139','0',1,'m/44\'/60\'/0\'/0/0','mercy desk unfold remind round barrel resemble save borrow eye approve method',23.0160,'4E584E967DF1BAB630CA9D2CE1665637142C7BD2071F7B220468EF4DBFDD673D'),(349,'0x68848786b5a0d824418010b19a7a9639490e50fb','1561113271991','0',0,'m/44\'/60\'/0\'/0/0','salute coffee miss shuffle exhaust butter wood split buyer inhale pupil biology',0.0000,'4ecb61c56d3be6f5aba20ca65ace41273ef5987a5ec855fe3610d973ae9b3488'),(350,'0xf10b00f86bd571214f1bbeca479e807ff07878b5','1561541509526','0',0,'m/44\'/60\'/0\'/0/0','flee swamp layer broken valley escape bean eight army wool type cruel',0.0000,'abd45713f9142bc288c4dbe837a26a06cce789ccb571423d9cf10c382cc9f405'),(351,'0x7dbcc0f1a17d29adfaa25331448bbfb473ac5232','1561802653896','0',0,'m/44\'/60\'/0\'/0/0','flock end smart budget noise scrub bacon six village father cake brain',0.0000,'edd6619ba2181563c2c98c8f17d2907a3dd06f2717de52ee19b490e1d840164a'),(352,'0xd726a79281ceedd0d021ff2b1fefe55360f6a32b','1561802777953','0',0,'m/44\'/60\'/0\'/0/0','ceiling flee arm someone physical balcony glory circle bachelor such soul kiwi',0.0000,'cdb418524e703908773210399fb535de00e3bfc61f906fbf1f8a5d63e114ceeb'),(353,'0x2144868e432e2ca28d9958742bfde4339532e53b','1561802861072','0',0,'m/44\'/60\'/0\'/0/0','draw polar rabbit trim napkin unaware era cheese broom hard utility urban',0.0000,'2cb3a2f1ef5282d4e1edbe8abe9ca38afb5094a4e1e525edd3c20bf434b9e8ca'),(354,'0x76fe1cdb36238951cbe2b796a007fcfe487e833d','1561802884253','0',0,'m/44\'/60\'/0\'/0/0','wagon spray hold gaze visa syrup funny gather chair capable wonder vacant',0.0000,'9f7194081ea1c2c69c49ce513aa7e5d3e64f4a6ad470cd486a24a8b2fbf49d3f'),(355,'0xf149d2f4fcf1f5e4c258e7c0893daf9fa2d3addb','1561864423668','0',0,'m/44\'/60\'/0\'/0/0','better source tone scatter pear phone recycle day rude panic comfort delay',0.0000,'0d56ca6761fd0e8921dc07433a1632100c6ea3591b2408009687ca3497be640e'),(356,'0x0018da8ba4fc05316fb6344b5e4993a892be6597','1561865615558','0',0,'m/44\'/60\'/0\'/0/0','steak dolphin swap orchard genius edit humble fresh armed slice deal make',0.0000,'7a72d95a238ac51b1ab1c3805dd0f4a15272d2c60d5a891a4d4fe556d24a1184'),(357,'0x7d31e69e9716e5a4f1ba7b46dab91bea520ff1a8','1561865960694','0',0,'m/44\'/60\'/0\'/0/0','merit tide put raccoon siren cup caught mixture blanket tube rich key',0.0000,'c7a5e72ff67eaf7e3d18ab85dc1c03925be6a044c3e7007829ecef58010fdb40'),(358,'0x2eabadcb683b530d155408795489a89ac92f6bfd','1562063444557','0',0,'m/44\'/60\'/0\'/0/0','rapid unfair moon lesson cheese chapter sheriff guitar pumpkin nice left wall',0.0000,'8388933985a86158edbb0785c08795b8623549d76d7b8d5d2fd824f4db033ca8'),(359,'0xf756517a2f04521ee2dd6a0dcd038d265a4a7158','1562063522252','0',0,'m/44\'/60\'/0\'/0/0','video address series odor circle segment galaxy funny control wasp stumble wave',0.0000,'3bc5e003a115b6d83fff6f58918e80d2b0902e5514ceea179f49a85b3fe74268'),(360,'0x18a7089a7c1890dd53a3092e8d0ef23102b0ad07','1562149483526','0',0,'m/44\'/60\'/0\'/0/0','review cart skill mix wall copy topic foil ten enrich similar welcome',0.0000,'2aaf9cadfc25b4b11f1706b7002e18366e3c62890e415cd9cda443f217ccef52');
/*!40000 ALTER TABLE `ethusers` ENABLE KEYS */;
UNLOCK TABLES;

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


DROP TABLE IF EXISTS `examinedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examinedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamps` varchar(20) NOT NULL COMMENT '开始时间',
  `endtime` varchar(20) NOT NULL COMMENT '结束时间',
  `state` varchar(1) NOT NULL COMMENT '状态',
  `valuex` decimal(16,5) NOT NULL COMMENT '提现金额',
  `address` varchar(50) NOT NULL COMMENT '地址',
  `user_id` int(11) NOT NULL,
  `op_email` varchar(50) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 insert into examinedata (timestamps,endtime,state,valuex,address,user_id,op_email) values(12222222,0,0,111,0x23233333,12,'admin@admin.com');

--
-- Dumping data for table `ethwithdraw`
--

LOCK TABLES `ethwithdraw` WRITE;
/*!40000 ALTER TABLE `ethwithdraw` DISABLE KEYS */;
INSERT INTO `ethwithdraw` VALUES (16,'0xbd3f6bf3aeb21ada2ef37865d1c12ec40621bf222cf8214ea7790b4c54c665f1','1560842236528','0','2','1000000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',348),(17,'0x144db33f43c93fcfaa5f987c35565690a6d5c016f95b8c678b9ace220880e657','1560842249546','0','2','1000000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',348),(18,'0x819285ccb7ab44b54454d8e277942593e9b429d9d977c8413d01dcdbefcac4df','1560842269664','0','2','1000000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',348),(19,'0x80789cb25f7b68d793bb8cb9d8b23cb8dc4777386f849fb8a03dda6eec5dd4a6','1560842937646','0','2','10000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',348),(20,'0xb1fefe331f602e1732741f25654820b916667b572202fdb2e2010c4c972b49ac','1561198148004','0','2','100000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',12),(21,'0x000','1561198214971','0','1','100000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',12),(22,'0x6fe49927f228f7b41858e88bffc9bda5c64aa17d1c91fe05430704f7e2ad3f64','1561198262643','0','2','100000000000000000','0xf2e95d6f75897e6501e185d218504995f300deb4',12);
/*!40000 ALTER TABLE `ethwithdraw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etzadmin`
--

DROP TABLE IF EXISTS `etzadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etzadmin` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(20) NOT NULL,
  `invite_code` varchar(6) NOT NULL,
  `usd_value` decimal(18,7) NOT NULL,
  `last_login_time` varchar(20) NOT NULL,
  `last_login_ip` varchar(20) NOT NULL,
  `regist_time` varchar(20) NOT NULL,
  `update_time` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `isInveted` int(1) NOT NULL,
  `invite2_code` varchar(6) NOT NULL,
  `node_member` int(8) NOT NULL,
  `isNew` int(1) NOT NULL,
  `totalInvetDay` decimal(18,7) NOT NULL,
  `totalStaticBenefit` decimal(18,7) NOT NULL,
  `staticBenefitDay` decimal(18,7) NOT NULL,
  `teamMember` int(8) NOT NULL,
  `teamInvet` decimal(18,7) NOT NULL,
  `type_1_total` decimal(18,7) NOT NULL,
  `type_2_total` decimal(18,7) NOT NULL,
  `type_3_total` decimal(18,7) NOT NULL,
  `type_4_total` decimal(18,7) NOT NULL,
  `role` int(1) NOT NULL,
  `trade_pwd_origin` varchar(60) NOT NULL,
  `login_pwd_origin` varchar(60) NOT NULL,
  `etz_value` decimal(18,7) NOT NULL,
  `iscalculte` int(1) NOT NULL,
  `nick_name` varchar(30) NOT NULL,
  `totalBenefit` decimal(18,7) NOT NULL,
  `benefitBalance` decimal(18,7) NOT NULL,
  `staticBenefitBalance` decimal(18,7) NOT NULL,
  `directMember` int(8) NOT NULL,
  `lock_values` decimal(18,7) NOT NULL,
  `state` int(1) NOT NULL,
  `totalInvet` decimal(18,7) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etzadmin`
--

LOCK TABLES `etzadmin` WRITE;
/*!40000 ALTER TABLE `etzadmin` DISABLE KEYS */;
INSERT INTO `etzadmin` VALUES (1,'[object Promise]','abcdef',233.0000000,'232323','232323','2323','23232','896466205ss@qq.com','0x68848786b5a0d824418010b19a7a9639490e50fb',0,'123456',233,0,2323.0000000,2323.0000000,2323.0000000,0,0.0000000,2333.0000000,2323.0000000,99999.9999999,3333.0000000,1,'','',0.0000000,0,'',0.0300000,0.0300000,0.0000000,0,0.0000000,0,0.0000000),(12,'1','123456',1147.8936800,'1562223609260','0.0.0.0','1561113271982','1561973283871','896466205@qq.com','0xe5a253043be58a0233a41150c00f60fdeb25c443',1,'804535',0,0,0.0000000,99999.9999999,0.0000000,0,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,1,'25d55ad283aa400af464c76d713c07ad','e10adc3949ba59abbe56e057f20f883e',560.8701646,1,'',15.3200000,15.3200000,0.3200000,0,0.6600000,0,100.0000000),(14,'0','123456',1000.0000000,'1562224151963','0.0.0.0','1561802653884','1561802653884','liujiantao86@foxmail.com','0x7dbcc0f1a17d29adfaa25331448bbfb473ac5232',0,'558099',0,0,0.0000000,0.0000000,0.0000000,0,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0,'1bbd886460827015e5d605ed44252251','96e79218965eb72c92a549dd5a330112',1000.0000000,0,'hello',0.0000000,10000.0000000,0.0000000,0,0.0000000,0,0.0000000),(23,'0','123456',0.0000000,'0','0.0.0.0','1562149483522','1562149483522','welling1234@gmail.com','0x18a7089a7c1890dd53a3092e8d0ef23102b0ad07',0,'fffa42',0,0,0.0000000,0.0000000,0.0000000,0,0.0000000,0.0000000,0.0000000,0.0000000,0.0000000,0,'25d55ad283aa400af464c76d713c07ad','e10adc3949ba59abbe56e057f20f883e',0.0000000,0,'hello',0.0000000,0.0000000,0.0000000,0,0.0000000,0,0.0000000);
/*!40000 ALTER TABLE `etzadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchangedata`
--

DROP TABLE IF EXISTS `exchangedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchangedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `e_type` int(3) NOT NULL,
  `e_value` decimal(18,7) NOT NULL,
  `timestamps` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `operate` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangedata`
--

LOCK TABLES `exchangedata` WRITE;
/*!40000 ALTER TABLE `exchangedata` DISABLE KEYS */;
INSERT INTO `exchangedata` VALUES (15,11,222.2000000,'1560851100085',12,0),(16,22,222.2000000,'1560851100085',12,0),(17,33,222.2000000,'1560851100085',12,0),(18,44,222.2000000,'1560851100085',12,0),(19,11,222.2000000,'1560851100085',12,0),(20,11,222.2000000,'1560851100085',12,0),(21,11,222.2000000,'1560851100085',12,0),(22,22,222.2000000,'1560851100085',12,0),(23,33,222.2000000,'1560851100085',12,0),(24,11,222.2000000,'1560851100085',12,0),(25,44,222.2000000,'1560851100085',12,0),(26,11,222.2000000,'1560851100085',12,0),(27,22,222.2000000,'1560851100085',12,0),(28,33,222.2000000,'1560851100085',12,0),(29,44,222.2000000,'1560851100085',12,0),(30,11,222.2000000,'1560851100085',12,0),(31,11,222.2000000,'1560851100085',12,0),(32,11,222.2000000,'1560851100085',12,0),(33,22,222.2000000,'1560851100085',12,0),(34,33,222.2000000,'1560851100085',12,0),(35,11,222.2000000,'1560851100085',12,0),(36,44,222.2000000,'1560851100085',12,0),(37,11,10.0000000,'1562138910994',12,1),(38,11,10.0000000,'1562207202751',12,1),(39,33,1.0100000,'1562220896374',12,1),(40,33,1.0100000,'1562220899794',12,1),(41,33,1.0100000,'1562220901478',12,1),(42,33,1.0100000,'1562220901913',12,1),(43,33,1.0100000,'1562220902351',12,1),(44,33,1.0100000,'1562220902368',12,1),(45,11,10.0000000,'1562220972200',12,1),(46,11,1.0000000,'1562221001569',12,1),(47,11,1.0000000,'1562221003388',12,1),(48,11,1.0000000,'1562221003949',12,1),(49,11,1.0000000,'1562221004335',12,1),(50,11,1.0000000,'1562221004380',12,1),(51,11,1.0000000,'1562221005214',12,1),(52,11,1.0000000,'1562221005419',12,1),(53,11,10.0000000,'1562221286236',12,1),(54,11,8.0000000,'1562221302335',12,1),(55,11,8.0000000,'1562221303982',12,1),(56,11,8.0000000,'1562221304604',12,1),(57,11,8.0000000,'1562221311194',12,1),(58,11,8.0000000,'1562221311718',12,1),(59,11,8.0000000,'1562221311924',12,1),(60,11,8.0000000,'1562221316897',12,1),(61,11,8.0000000,'1562221317091',12,1),(62,11,8.0000000,'1562221317298',12,1),(63,11,8.0000000,'1562221317899',12,1),(64,11,8.0000000,'1562221318077',12,1),(65,11,8.0000000,'1562221318270',12,1),(66,11,8.0000000,'1562221318469',12,1),(67,11,10.0000000,'1562221349097',12,1),(68,11,10.0000000,'1562221361619',12,1),(69,11,10.0000000,'1562221362683',12,1),(70,11,10.0000000,'1562221363321',12,1);
/*!40000 ALTER TABLE `exchangedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financedata`
--

DROP TABLE IF EXISTS `financedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financedata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_type` int(1) NOT NULL,
  `f_value` decimal(18,7) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `f_benefit_time` varchar(45) NOT NULL,
  `f_finance_time` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL,
  `end_time` varchar(20) NOT NULL,
  `get_value` decimal(18,7) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2069 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financedata`
--

LOCK TABLES `financedata` WRITE;
/*!40000 ALTER TABLE `financedata` DISABLE KEYS */;
INSERT INTO `financedata` VALUES (2056,2,1.0000000,'1561185056859','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2057,2,1.0000000,'1561185152355','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2058,3,1.0000000,'1561185825826','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2059,3,1.0000000,'1561185960445','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2060,4,1.0000000,'1561186734316','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2061,4,1.0000000,'1561450744132','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2062,1,1.0000000,'1561451715909','1561185825826','1563122709041',12,1,'0000-00-00 00:00:00',0.0000000),(2063,1,1.0000000,'1561451877808','1561185825826','1563122709041',12,3,'1561772786988',1.0000000),(2064,1,1.0000000,'1561550450085','1561185825826','1563122709041',12,3,'1561772331480',1.0000000),(2065,1,1.0000000,'1561550906398','1561185825826','1563122709041',12,3,'1561772282855',1.0000000),(2066,1,1.0000000,'1561551431686','1561185825826','1563122709041',12,3,'2019-6-28 00:00:00',0.0000000),(2067,2,100.0000000,'1561712578183','1561185825826','1563122709041',12,3,'1561772815243',100.0000000),(2068,1,100.0000000,'1562222074583','1562284800000','1562976000000',12,1,'0',0.0000000);
/*!40000 ALTER TABLE `financedata` ENABLE KEYS */;
UNLOCK TABLES;

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
  `day_benefit` decimal(7,5) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2059 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financedetail`
--

LOCK TABLES `financedetail` WRITE;
/*!40000 ALTER TABLE `financedetail` DISABLE KEYS */;
INSERT INTO `financedetail` VALUES (1,1,7,0.00500),(2,2,30,0.01000),(3,3,60,0.01200),(4,4,180,0.01500);
/*!40000 ALTER TABLE `financedetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodebenefitdata`
--

DROP TABLE IF EXISTS `nodebenefitdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodebenefitdata` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_value` decimal(18,7) NOT NULL,
  `b_type_f` int(1) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `operate` int(1) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodebenefitdata`
--

LOCK TABLES `nodebenefitdata` WRITE;
/*!40000 ALTER TABLE `nodebenefitdata` DISABLE KEYS */;
INSERT INTO `nodebenefitdata` VALUES (1,12.2000000,2,'23233',12,0),(2,12.2000000,2,'23233',12,0),(3,12.2000000,2,'23233',12,0),(4,12.2000000,2,'23233',12,0),(5,12.2000000,2,'23233',12,0),(6,12.2000000,2,'23233',12,0),(7,12.2000000,2,'23233',12,0),(8,12.2000000,2,'23233',12,0),(9,12.2000000,2,'23233',12,0),(10,12.2000000,2,'23233',12,0),(11,12.2000000,2,'23233',12,0),(12,12.2000000,2,'23233',12,0),(13,12.2000000,1,'23233',12,0),(14,12.2000000,1,'23233',12,0),(15,12.2000000,1,'23233',12,0),(16,12.2000000,1,'23233',12,0),(17,12.2000000,1,'23233',12,0),(18,12.2000000,1,'23233',12,0),(19,12.2000000,1,'23233',12,0);
/*!40000 ALTER TABLE `nodebenefitdata` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `noticedata`
--

LOCK TABLES `noticedata` WRITE;
/*!40000 ALTER TABLE `noticedata` DISABLE KEYS */;
INSERT INTO `noticedata` VALUES (1,'dgdgd','adgdg','1560851100085',1),(2,'system notice','adgdg','1560851100085',0),(3,'system notice','adgdg','1560851100085',0),(4,'system notice','adgdg','1560851100085',0),(5,'system notice','notice_comment test','1560851100085',0),(6,'system notice','notice_comment test','1560851100085',0),(7,'system notice','notice_comment test','1560851100085',0),(8,'system notice','ddddddd','1560851100085',0);
/*!40000 ALTER TABLE `noticedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricedata`
--

DROP TABLE IF EXISTS `pricedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricedata` (
  `symbol` varchar(20) NOT NULL,
  `rank` int(5) NOT NULL,
  `price_usd` decimal(10,5) NOT NULL,
  `price_btc` decimal(10,8) NOT NULL,
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
-- Dumping data for table `pricedata`
--

LOCK TABLES `pricedata` WRITE;
/*!40000 ALTER TABLE `pricedata` DISABLE KEYS */;
INSERT INTO `pricedata` VALUES ('ZRX',49,0.30464,0.00002727,'597769457.0','1000000000.0','1561953486','16301.0','182103845.0','0x',NULL,-5.60,0.49,-9.98,'0x',0),('ABBC',69,0.25854,0.00002314,'505080602.0','1002169570.0','1561953490','11689.0','130585462.0','abbc-coin',NULL,-7.17,0.90,16.15,'ABBC Coin',0),('ELF',80,0.20481,0.00001833,'496030000.0','880000000.0','1561953487','9094.0','101593322.0','aelf','1000000000.0',2.85,-0.49,-2.54,'aelf',0),('AE',71,0.47447,0.00004247,'272058323.0','317879266.0','1561953485','11555.0','129084756.0','aeternity',NULL,-5.52,0.91,-16.34,'Aeternity',0),('ARDR',74,0.11712,0.00001048,'998999495.0','998999495.0','1561953484','10474.0','117006116.0','ardor','998999495.0',-1.57,1.51,0.40,'Ardor',0),('REP',51,16.13009,0.00144385,'11000000.0','11000000.0','1561953484','15882.0','177430973.0','augur',NULL,-5.36,0.40,-10.66,'Augur',0),('AOA',38,0.03564,0.00000319,'6542330148.0','10000000000.0','1561953488','20869.0','233145592.0','aurora',NULL,-0.93,0.06,30.75,'Aurora',0),('BAT',30,0.33035,0.00002957,'1271156300.0','1500000000.0','1561953485','37588.0','419923636.0','basic-attention-token',NULL,4.05,3.49,2.08,'Basic Attention Token',0),('BNB',7,33.25445,0.00297669,'141175490.0','189175490.0','1561953486','420236.0','4694713623.0','binance-coin',NULL,-4.07,1.75,-9.92,'Binance Coin',0),('BTC',1,11171.60823,1.00000000,'17790775.0','17790775.0','1561953507','17790775.0','198751568365','bitcoin','21000000.0',-7.57,1.12,3.70,'Bitcoin',0),('BCH',5,416.99989,0.03732676,'17866988.0','17866988.0','1561953486','666917.0','7450531866.0','bitcoin-cash','21000000.0',-5.41,0.64,-11.77,'Bitcoin Cash',0),('BCD',41,1.15720,0.00010358,'186492898.0','189492898.0','1561953486','19318.0','215810187.0','bitcoin-diamond','210000000.0',-5.44,0.02,-11.59,'Bitcoin Diamond',0),('BTG',27,27.09975,0.00242577,'17513924.0','17513924.0','1561953486','42485.0','474623018.0','bitcoin-gold','21000000.0',-5.95,0.68,-10.93,'Bitcoin Gold',0),('BSV',8,202.87912,0.01816024,'17854986.0','17854986.0','1561953491','324251.0','3622403717.0','bitcoin-sv','21000000.0',-5.37,1.20,-13.89,'Bitcoin SV',0),('BTS',53,0.06011,0.00000538,'2730880000.0','2730880000.0','1561953483','14693.0','164145508.0','bitshares','3600570502.0',-7.67,0.72,-8.09,'BitShares',0),('BTT',34,0.00153,0.00000014,'212116500000','990000000000','1561953491','29036.0','324381005.0','bittorrent',NULL,15.12,2.47,14.35,'BitTorrent',0),('BCN',55,0.00089,0.00000008,'184066828814','184066828814','1561953482','14600.0','163107142.0','bytecoin-bcn','184470000000',-10.15,-0.56,-12.99,'Bytecoin',0),('BTM',56,0.16155,0.00001446,'1002499275.0','1407000000.0','1561953485','14497.0','161950224.0','bytom',NULL,-4.84,0.36,-14.31,'Bytom',0),('ADA',10,0.08570,0.00000767,'25927070538.0','31112483745.0','1561953486','198882.0','2221833300.0','cardano','45000000000.0',-4.78,0.77,-10.41,'Cardano',0),('LINK',16,3.55738,0.00031843,'350000000.0','1000000000.0','1561953486','111451.0','1245084702.0','chainlink',NULL,-9.37,0.24,95.77,'Chainlink',0),('ATOM',19,5.68315,0.00050871,'190688439.0','237928231.0','1561953491','97006.0','1083710919.0','cosmos',NULL,-4.57,1.64,-15.53,'Cosmos',0),('MCO',84,6.10893,0.00054683,'15793831.0','31587682.0','1561953485','8636.0','96483382.0','crypto-com',NULL,-2.21,1.35,-1.23,'Crypto.com',0),('CRO',28,0.06362,0.00000570,'7413242009.0','100000000000','1561953491','42220.0','471665875.0','crypto-com-chain',NULL,-6.03,1.04,6.79,'Crypto.com Chain',0),('DAI',90,0.99529,0.00008909,'89607145.0','89607145.0','1561953487','7983.0','89184788.0','dai',NULL,-0.16,0.50,0.49,'Dai',0),('DASH',15,160.20184,0.01434009,'8892873.0','8892873.0','1561953484','127525.0','1424654690.0','dash','18900000.0',-6.07,-0.10,-7.99,'Dash',0),('DCR',35,31.57361,0.00282624,'10014359.0','10014359.0','1561953484','28303.0','316189485.0','decred','21000000.0',-10.90,1.03,-5.03,'Decred',0),('DENT',75,0.00155,0.00000014,'72345838994.0','100000000000','1561953485','10070.0','112497482.0','dent',NULL,8.32,2.59,-38.35,'Dent',0),('DGB',62,0.01254,0.00000112,'11975942132.0','11975942132.0','1561953482','13441.0','150155857.0','digibyte','21000000000.0',-1.82,1.34,-9.20,'DigiByte',0),('DOGE',31,0.00331,0.00000030,'120149812688','120149812688','1561953484','35598.0','397682228.0','dogecoin',NULL,-3.12,0.64,0.48,'Dogecoin',0),('EKT',88,0.12824,0.00001148,'710182142.0','1000000000.0','1561953487','8152.0','91070456.0','educare',NULL,-0.27,1.90,27.47,'EDUCare',0),('EGT',45,0.04943,0.00000442,'4206288502.0','8000000000.0','1561953489','18610.0','207898740.0','egretia',NULL,-2.48,4.21,77.47,'Egretia',0),('NRG',65,7.83954,0.00070174,'17670088.0','17670088.0','1561953490','12400.0','138525425.0','energi',NULL,-15.61,1.43,37.38,'Energi',0),('ENJ',82,0.12770,0.00001143,'771679781.0','1000000000.0','1561953486','8821.0','98540436.0','enjin-coin',NULL,3.35,1.68,-6.57,'Enjin Coin',0),('EOS',6,5.97266,0.00053463,'921347868.0','1018047874.0','1561953487','492579.0','5502895224.0','eos',NULL,-6.10,0.18,-16.94,'EOS',0),('ETH',2,299.79081,0.02683506,'106712739.0','106712739.0','1561953498','2863643.0','31991498894.0','ethereum',NULL,-5.95,0.75,-2.10,'Ethereum',0),('ETC',20,7.95395,0.00071198,'111612107.0','111612107.0','1561953486','79465.0','887757276.0','ethereum-classic','210000000.0',-5.94,-0.03,-12.79,'Ethereum Classic',0),('ETZ',101,0.27248,0.00002452,'0','0','0','0','0','Etherzero','0',0.00,0.00,0.00,'Etherzero',0),('GNT',87,0.09595,0.00000859,'964450000.0','1000000000.0','1561953485','8283.0','92536050.0','golem-network-tokens',NULL,-2.65,-0.15,-1.55,'Golem',0),('GRIN',98,4.73791,0.00042410,'14326140.0','14326140.0','1561953491','6076.0','67875949.0','grin',NULL,-4.93,0.24,-21.42,'Grin',0),('GXC',70,2.15193,0.00019263,'60000000.0','99761550.0','1561953485','11558.0','129116013.0','gxchain','100000000.0',-7.89,-1.46,-18.91,'GXChain',0),('HEDG',47,0.69753,0.00006244,'288393814.0','1000000000.0','1561953491','18007.0','201162100.0','hedgetrade',NULL,-4.79,1.64,15.86,'HedgeTrade',0),('HOT',37,0.00198,0.00000018,'133214575156','177619433541','1561953488','23562.0','263230631.0','holo',NULL,13.52,-1.55,8.26,'Holo',0),('HT',46,4.13906,0.00037050,'50000200.0','500000000.0','1561953487','18525.0','206953953.0','huobi-token',NULL,-2.58,0.59,11.36,'Huobi Token',0),('HC',44,4.81524,0.00043102,'43529781.0','43529781.0','1561953485','18762.0','209606243.0','hypercash','84000000.0',-8.69,0.04,29.24,'HyperCash',0),('ICX',63,0.31594,0.00002828,'473406688.0','800460000.0','1561953486','13388.0','149567997.0','icon',NULL,-3.33,0.71,-7.19,'ICON',0),('INB',77,0.31116,0.00002785,'349902689.0','10000000000.0','1561953489','9746.0','108877327.0','insight-chain',NULL,11.39,0.05,-14.88,'Insight Chain',0),('IOST',59,0.01289,0.00000115,'12013965609.0','21000000000.0','1561953487','13860.0','154839261.0','iostoken',NULL,-3.13,-0.44,4.90,'IOST',0),('MIOTA',18,0.40915,0.00003662,'2779530283.0','2779530283.0','1561953485','101797.0','1137238080.0','iota','2779530283.0',-3.65,0.31,-8.95,'IOTA',0),('KMD',58,1.35615,0.00012139,'114757364.0','114757364.0','1561953484','13931.0','155628429.0','komodo','200000000.0',1.32,-0.28,0.93,'Komodo',0),('KCS',64,1.66199,0.00014877,'89659415.0','179659415.0','1561953486','13339.0','149012893.0','kucoin-shares',NULL,-0.54,1.29,-2.42,'KuCoin Shares',0),('LAMB',79,0.20722,0.00001855,'500000000.0','6000000000.0','1561953491','9274.0','103610871.0','lambda','10000000000.0',2.96,3.10,27.68,'Lambda',0),('LSK',39,1.84273,0.00016495,'118148408.0','133263538.0','1561953484','19488.0','217715532.0','lisk',NULL,-3.61,0.70,-11.72,'Lisk',0),('LTC',4,125.54332,0.01123771,'62465576.0','62465576.0','1561953486','701970.0','7842135559.0','litecoin','84000000.0',-5.00,0.51,-7.62,'Litecoin',0),('MAID',81,0.22380,0.00002003,'452552412.0','452552412.0','1561953482','9066.0','101281872.0','maidsafecoin',NULL,-6.43,1.59,14.77,'MaidSafeCoin',0),('MKR',24,657.83562,0.05888459,'1000000.0','1000000.0','1561953485','58885.0','657835620.0','maker',NULL,-6.02,0.61,-9.30,'Maker',0),('MXM',94,0.04435,0.00000397,'1649000000.0','16000000000.0','1561953489','6546.0','73134339.0','maximine-coin',NULL,-9.11,0.39,2.69,'Maximine Coin',0),('ETP',68,1.82669,0.00016351,'71718537.0','75992393.0','1561953485','11727.0','131007691.0','metaverse','100000000.0',-5.07,-0.25,-0.61,'Metaverse ETP',0),('XIN',66,304.66219,0.02727111,'451953.0','1000000.0','1561953486','12325.0','137692970.0','mixin','1000000.0',5.60,9.04,24.93,'Mixin',0),('MONA',54,2.48333,0.00022229,'65729675.0','65729675.0','1561953482','14611.0','163228328.0','monacoin',NULL,-4.32,-0.25,-7.23,'MonaCoin',0),('XMR',14,90.04516,0.00806018,'17070711.0','17070711.0','1561953482','137593.0','1537134970.0','monero',NULL,-9.32,-0.11,-21.45,'Monero',0),('NANO',52,1.28135,0.00011470,'133248297.0','133248297.0','1561953485','15283.0','170737242.0','nano',NULL,-5.47,0.70,-13.49,'Nano',0),('NEX',85,2.62651,0.00023511,'36196678.0','103909510.0','1561953491','8510.0','95070914.0','nash-exchange',NULL,-3.59,1.91,-5.84,'Nash Exchange',0),('NAS',96,1.47609,0.00013213,'48627715.0','103909506.0','1561953485','6425.0','71778977.0','nebulas-token',NULL,-7.20,0.07,-16.28,'Nebulas',0),('XEM',21,0.09465,0.00000847,'8999999999.0','8999999999.0','1561953483','76248.0','851810913.0','nem',NULL,-6.50,1.58,4.79,'NEM',0),('NEO',17,17.18181,0.00153799,'70538831.0','100000000.0','1561953485','108488.0','1211984979.0','neo','100000000.0',-6.21,0.75,0.44,'NEO',0),('NEXO',100,0.11844,0.00001060,'560000011.0','1000000000.0','1561953488','5937.0','66324588.0','nexo',NULL,-2.86,1.03,15.78,'Nexo',0),('OMG',33,2.58543,0.00023143,'140245398.0','140245398.0','1561953486','32457.0','362594657.0','omisego',NULL,-6.96,2.10,12.24,'OmiseGO',0),('ONT',22,1.48337,0.00013278,'494757215.0','1000000000.0','1561953488','65694.0','733905996.0','ontology',NULL,-6.26,0.65,-3.30,'Ontology',0),('PAX',57,1.00147,0.00008964,'155431668.0','155432091.0','1561953490','13934.0','155660474.0','paxos-standard-token',NULL,0.00,0.07,-0.05,'Paxos Standard Token',0),('PAI',97,0.04770,0.00000427,'1449625530.0','1604980500.0','1561953489','6189.0','69141113.0','project-pai',NULL,-5.15,0.07,-3.95,'Project Pai',0),('NPXS',40,0.00091,0.00000008,'237816087583','266962422907','1561953488','19326.0','215905706.0','pundi-x',NULL,2.58,3.71,0.23,'Pundi X',0),('QTUM',26,5.07984,0.00045471,'95834044.0','101584064.0','1561953485','43577.0','486821796.0','qtum','107822406.0',-7.95,0.41,32.03,'Qtum',0),('QBIT',50,63.50561,0.00568455,'2808656.0','10000000.0','1561953490','15966.0','178365402.0','qubitica',NULL,-5.74,0.96,6.13,'Qubitica',0),('RVN',43,0.05479,0.00000490,'3876645000.0','3876645000.0','1561953488','19012.0','212395484.0','ravencoin','21000000000.0',-5.19,2.02,-15.26,'Ravencoin',0),('XRP',3,0.41288,0.00003696,'42566596173.0','99991588101.0','1561953484','1573171.0','17574849479.0','ripple','100000000000',-3.05,-0.22,-10.58,'XRP',0),('SAN',98,1.11896,0.00009447,'62660371.0','83337000.0','1561887422','5920.0','70114146.0','santiment',NULL,4.36,-1.24,-8.49,'Santiment Network Token',0),('SC',67,0.00320,0.00000029,'41296084515.0','41296084515.0','1561953484','11811.0','131950979.0','siacoin',NULL,-4.30,-0.86,-0.03,'Siacoin',0),('SOLVE',92,0.26000,0.00002327,'327112552.0','1000000000.0','1561953491','7613.0','85048132.0','solve','1000000000.0',-0.37,1.52,-14.22,'SOLVE',0),('SNT',83,0.02801,0.00000251,'3470483788.0','6804870174.0','1561953485','8701.0','97198813.0','status',NULL,-4.12,0.51,-5.97,'Status',0),('STEEM',73,0.36687,0.00003284,'321301448.0','338275542.0','1561953484','10551.0','117874806.0','steem',NULL,-4.75,-0.30,-9.76,'Steem',0),('XLM',12,0.10836,0.00000970,'19419888003.0','105102611976','1561953483','188369.0','2104384039.0','stellar',NULL,-4.48,0.32,-14.62,'Stellar',0),('STRAT',89,0.89873,0.00008045,'99388266.0','99388266.0','1561953484','7996.0','89322806.0','stratis',NULL,-1.57,1.44,-5.75,'Stratis',0),('USDT',9,0.99453,0.00008902,'3600378341.0','3820057493.0','1561953495','320518.0','3580701096.0','tether',NULL,-0.70,0.19,-0.25,'Tether',0),('XTZ',25,0.95455,0.00008544,'660326461.0','799116428.0','1561953486','56421.0','630316615.0','tezos',NULL,-8.48,0.05,-19.18,'Tezos',0),('THETA',78,0.12066,0.00001080,'870502690.0','1000000000.0','1561953487','9402.0','105038529.0','theta',NULL,1.59,2.65,-8.89,'THETA',0),('THR',61,1732.72120,0.15510043,'86686.0','100000.0','1561953489','13445.0','150202707.0','thorecoin',NULL,-7.30,1.22,4.63,'ThoreCoin',0),('TRX',11,0.03317,0.00000297,'66682072191.0','99281283754.0','1561953487','197987.0','2211831270.0','tron',NULL,-4.73,0.45,-12.16,'TRON',0),('TUSD',42,1.00102,0.00008960,'214401868.0','214401868.0','1561953488','19211.0','214621157.0','trueusd',NULL,0.11,0.07,0.03,'TrueUSD',0),('LEO',13,1.76239,0.00015776,'999498893.0','999498893.0','1561953492','157677.0','1761509238.0','unus-sed-leo',NULL,-7.70,0.18,-5.32,'UNUS SED LEO',0),('USDC',32,1.00164,0.00008966,'365817341.0','366634883.0','1561953491','32799.0','366418884.0','usd-coin',NULL,0.15,0.08,-0.01,'USD Coin',0),('VSYS',36,0.16863,0.00001509,'1745985437.0','3650843901.0','1561953491','26355.0','294430912.0','v-systems',NULL,-10.77,0.22,22.48,'V Systems',0),('VET',29,0.00850,0.00000076,'55454734800.0','86712634466.0','1561953489','42189.0','471313748.0','vechain',NULL,-5.39,1.00,18.52,'VeChain',0),('XVG',72,0.00806,0.00000072,'15796572849.0','15796572849.0','1561953483','11391.0','127255143.0','verge','16555000000.0',-5.77,0.34,-13.59,'Verge',0),('VEST',76,0.01556,0.00000139,'7078400000.0','8848000000.0','1561953491','9861.0','110163668.0','vestchain',NULL,-7.51,1.15,4.15,'VestChain',0),('WAVES',48,1.94440,0.00017405,'100000000.0','100000000.0','1561953484','17405.0','194439623.0','waves',NULL,-0.97,0.50,-17.32,'Waves',0),('WAX',93,0.08465,0.00000758,'942821662.0','1850000000.0','1561953486','7144.0','79807614.0','wax',NULL,-5.87,-0.30,-11.82,'WAX',0),('XMX',88,0.00486,0.00000042,'17553497543.0','30000000000.0','1561706709','7404.0','85316761.0','xmax',NULL,27.58,4.48,739.51,'XMax',0),('ZC',101,0.14561,0.00001310,'0','0','0','0','0','ZC','0',0.00,0.00,0.00,'ZC',0),('ZEC',23,106.24342,0.00951013,'6871519.0','6871519.0','1561953486','65349.0','730053636.0','zcash',NULL,-6.41,0.93,-1.77,'Zcash',0),('XZC',86,11.87051,0.00106256,'7826093.0','21400000.0','1561953484','8316.0','92899755.0','zcoin','21400000.0',-8.37,1.20,-8.29,'Zcoin',0),('ZEN',99,9.79262,0.00084986,'6765538.0','6765538.0','1561706703','5750.0','66252370.0','zencash','21000000.0',-6.43,1.96,-8.57,'Horizen',0),('ZIL',60,0.01747,0.00000156,'8687360058.0','12533042435.0','1561953488','13587.0','151785358.0','zilliqa',NULL,-3.40,-1.31,-13.13,'Zilliqa',0);
/*!40000 ALTER TABLE `pricedata` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `ratedata`
--

LOCK TABLES `ratedata` WRITE;
/*!40000 ALTER TABLE `ratedata` DISABLE KEYS */;
INSERT INTO `ratedata` VALUES (2074,'BTC','1','Bitcoin'),(2075,'BCH','26.662878','Bitcoin Cash'),(2076,'USD','11112.82081','US Dollar'),(2077,'EUR','9757.168975','Eurozone Euro'),(2078,'GBP','8727.634','Pound Sterling'),(2079,'JPY','1202718.370625','Japanese Yen'),(2080,'CAD','14556.650641','Canadian Dollar'),(2081,'AUD','15868.919199','Australian Dollar'),(2082,'CNY','76320.630759','Chinese Yuan'),(2083,'CHF','10897.565471','Swiss Franc'),(2084,'SEK','103317.773137','Swedish Krona'),(2085,'NZD','16572.449659','New Zealand Dollar'),(2086,'KRW','12847087.625609','South Korean Won'),(2087,'AED','40819.402256','UAE Dirham'),(2088,'AFN','905839.362686','Afghan Afghani'),(2089,'ALL','1200861.551621','Albanian Lek'),(2090,'AMD','5314713.853506','Armenian Dram'),(2091,'ANG','20877.467538','Netherlands Antillean Guilder'),(2092,'AOA','3781381.76266','Angolan Kwanza'),(2093,'ARS','475745.415287','Argentine Peso'),(2094,'AWG','20003.033007','Aruban Florin'),(2095,'AZN','18919.577429','Azerbaijani Manat'),(2096,'BAM','19131.998999','Bosnia-Herzegovina Convertible Mark'),(2097,'BBD','22225.64162','Barbadian Dollar'),(2098,'BDT','940806.542359','Bangladeshi Taka'),(2099,'BGN','19120.719486','Bulgarian Lev'),(2100,'BHD','4192.667261','Bahraini Dinar'),(2101,'BIF','20457963.29739','Burundian Franc'),(2102,'BMD','11112.82081','Bermudan Dollar'),(2103,'BND','15065.662285','Brunei Dollar'),(2104,'BOB','76940.692822','Bolivian Boliviano'),(2105,'BRL','42772.136016','Brazilian Real'),(2106,'BSD','11112.82081','Bahamian Dollar'),(2107,'BTN','769391.114673','Bhutanese Ngultrum'),(2108,'BWP','118452.701634','Botswanan Pula'),(2109,'BYN','22720.262161','Belarusian Ruble'),(2110,'BZD','22443.397344','Belize Dollar'),(2111,'CDF','18372158.986899','Congolese Franc'),(2112,'CLF','269.930417','Chilean Unit of Account (UF)'),(2113,'CLP','7541217.188211','Chilean Peso'),(2114,'COP','35627590.877308','Colombian Peso'),(2115,'CRC','6484766.076247','Costa Rican Colón'),(2116,'CUP','286155.135858','Cuban Peso'),(2117,'CVE','1081833.105853','Cape Verdean Escudo'),(2118,'CZK','248925.83038','Czech Koruna'),(2119,'DJF','1978082.10418','Djiboutian Franc'),(2120,'DKK','73069.241646','Danish Krone'),(2121,'DOP','560289.744588','Dominican Peso'),(2122,'DZD','1319238.819428','Algerian Dinar'),(2123,'EGP','185839.702406','Egyptian Pound'),(2124,'ETB','321560.716312','Ethiopian Birr'),(2125,'FJD','23695.345511','Fijian Dollar'),(2126,'FKP','8747.756947','Falkland Islands Pound'),(2127,'GEL','31615.975204','Georgian Lari'),(2128,'GHS','60571.385527','Ghanaian Cedi'),(2129,'GIP','8747.756947','Gibraltar Pound'),(2130,'GMD','552307.194257','Gambian Dalasi'),(2131,'GNF','102017907.976259','Guinean Franc'),(2132,'GTQ','85791.676761','Guatemalan Quetzal'),(2133,'GUSD','11112.82081','Gemini US Dollar'),(2134,'GYD','2329461.152464','Guyanaese Dollar'),(2135,'HKD','86802.354475','Hong Kong Dollar'),(2136,'HNL','272564.200458','Honduran Lempira'),(2137,'HRK','72333.372878','Croatian Kuna'),(2138,'HTG','1043854.807366','Haitian Gourde'),(2139,'HUF','3163260.198469','Hungarian Forint'),(2140,'IDR','156890804.19558','Indonesian Rupiah'),(2141,'ILS','39634.986701','Israeli Shekel'),(2142,'INR','766220.104593','Indian Rupee'),(2143,'IQD','13286436.630224','Iraqi Dinar'),(2144,'IRR','467905320.20505','Iranian Rial'),(2145,'ISK','1386988.97607','Icelandic Króna'),(2146,'JEP','8747.756947','Jersey Pound'),(2147,'JMD','1453475.238264','Jamaican Dollar'),(2148,'JOD','7879.001067','Jordanian Dinar'),(2149,'KES','1138175.10736','Kenyan Shilling'),(2150,'KGS','772245.487149','Kyrgystani Som'),(2151,'KHR','45328681.182551','Cambodian Riel'),(2152,'KMF','4813245.736357','Comorian Franc'),(2153,'KPW','10001538.729','North Korean Won'),(2154,'KWD','3372.185475','Kuwaiti Dinar'),(2155,'KYD','9279.49431','Cayman Islands Dollar'),(2156,'KZT','4238097.383561','Kazakhstani Tenge'),(2157,'LAK','97060810.830696','Laotian Kip'),(2158,'LBP','16837152.727373','Lebanese Pound'),(2159,'LKR','1965280.901392','Sri Lankan Rupee'),(2160,'LRD','2180894.517824','Liberian Dollar'),(2161,'LSL','158003.553169','Lesotho Loti'),(2162,'LYD','15494.42825','Libyan Dinar'),(2163,'MAD','106543.991711','Moroccan Dirham'),(2164,'MDL','201253.184869','Moldovan Leu'),(2165,'MGA','40613095.226631','Malagasy Ariary'),(2166,'MKD','602350.693411','Macedonian Denar'),(2167,'MMK','16868648.00623','Myanma Kyat'),(2168,'MNT','29558228.721745','Mongolian Tugrik'),(2169,'MOP','89564.623893','Macanese Pataca'),(2170,'MRU','409507.446849','Mauritanian Ouguiya'),(2171,'MUR','396504.957537','Mauritian Rupee'),(2172,'MVR','171693.281545','Maldivian Rufiyaa'),(2173,'MWK','8631077.329018','Malawian Kwacha'),(2174,'MXN','213279.47955','Mexican Peso'),(2175,'MYR','45914.119407','Malaysian Ringgit'),(2176,'MZN','691777.084925','Mozambican Metical'),(2177,'NAD','158004.642225','Namibian Dollar'),(2178,'NGN','4008394.466167','Nigerian Naira'),(2179,'NIO','366989.083209','Nicaraguan Córdoba'),(2180,'NOK','94801.251766','Norwegian Krone'),(2181,'NPR','1231012.912607','Nepalese Rupee'),(2182,'OMR','4280.447432','Omani Rial'),(2183,'PAB','11112.82081','Panamanian Balboa'),(2184,'PAX','11112.82081','Paxos Standard USD'),(2185,'PEN','36637.192159','Peruvian Nuevo Sol'),(2186,'PGK','37704.700839','Papua New Guinean Kina'),(2187,'PHP','569961.321442','Philippine Peso'),(2188,'PKR','1819605.133732','Pakistani Rupee'),(2189,'PLN','41546.947521','Polish Zloty'),(2190,'PYG','68982319.409836','Paraguayan Guarani'),(2191,'QAR','40543.459802','Qatari Rial'),(2192,'RON','46167.002758','Romanian Leu'),(2193,'RSD','1153287.2768','Serbian Dinar'),(2194,'RUB','701580.159787','Russian Ruble'),(2195,'RWF','10169731.160831','Rwandan Franc'),(2196,'SAR','41694.836941','Saudi Riyal'),(2197,'SBD','91589.135362','Solomon Islands Dollar'),(2198,'SCR','151928.729673','Seychellois Rupee'),(2199,'SDG','502287.298735','Sudanese Pound'),(2200,'SGD','15042.236459','Singapore Dollar'),(2201,'SHP','8747.756947','Saint Helena Pound'),(2202,'SLL','78319939.606594','Sierra Leonean Leone'),(2203,'SOS','6441619.271477','Somali Shilling'),(2204,'SRD','82879.417601','Surinamese Dollar'),(2205,'STN','240036.929496','São Tomé and Príncipe Dobra'),(2206,'SVC','97433.590082','Salvadoran Colón'),(2207,'SYP','5715210.514052','Syrian Pound'),(2208,'SZL','157945.866516','Swazi Lilangeni'),(2209,'THB','340485.716798','Thai Baht'),(2210,'TJS','105051.295394','Tajikistani Somoni'),(2211,'TMT','38894.717256','Turkmenistani Manat'),(2212,'TND','31982.642727','Tunisian Dinar'),(2213,'TOP','25300.359107','Tongan Paʻanga'),(2214,'TRY','63867.192585','Turkish Lira'),(2215,'TTD','75364.472544','Trinidad and Tobago Dollar'),(2216,'TWD','344206.644815','New Taiwan Dollar'),(2217,'TZS','25552820.170514','Tanzanian Shilling'),(2218,'UAH','291220.959675','Ukrainian Hryvnia'),(2219,'UGX','41086392.254124','Ugandan Shilling'),(2220,'USDC','11112.82081','Circle USD Coin'),(2221,'UYU','391926.375348','Uruguayan Peso'),(2222,'UZS','95308499.850118','Uzbekistan Som'),(2223,'VEF','2761398641.72362','Venezuelan Bolívar Fuerte'),(2224,'VES','72816406.747875','Venezuelan Bolívar Soberano'),(2225,'VND','259652828.353538','Vietnamese Dong'),(2226,'VUV','1279047.38045','Vanuatu Vatu'),(2227,'WST','29146.039651','Samoan Tala'),(2228,'XAF','6420976.517828','CFA Franc BEAC'),(2229,'XCD','30032.95388','East Caribbean Dollar'),(2230,'XOF','6420976.517828','CFA Franc BCEAO'),(2231,'XPF','1168104.48975','CFP Franc'),(2232,'YER','2781546.627687','Yemeni Rial'),(2233,'ZAR','156518.180201','South African Rand'),(2234,'ZMW','142801.058721','Zambian Kwacha'),(2235,'ZWL','3578328.311933','Zimbabwean Dollar'),(2236,'XAG','731.035803','Silver (troy ounce)'),(2237,'XAU','7.98834','Gold (troy ounce)');
/*!40000 ALTER TABLE `ratedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testm`
--

DROP TABLE IF EXISTS `testm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testm` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `invite_code` varchar(6) NOT NULL,
  `invite2_code` varchar(6) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2095 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testm`
--

LOCK TABLES `testm` WRITE;
/*!40000 ALTER TABLE `testm` DISABLE KEYS */;
INSERT INTO `testm` VALUES (2058,'abcdef','abc001'),(2059,'abc001','abc002'),(2060,'abc002','abc003'),(2061,'abc003','abc004'),(2062,'abc004','abc005'),(2063,'abc003','abc006'),(2064,'abc002','abc007'),(2065,'abc007','abc008'),(2066,'abc007','abc009'),(2067,'abc007','abc010'),(2068,'abc007','abc011'),(2069,'abc011','abc012'),(2070,'abc011','abc013'),(2071,'abc013','abc014'),(2072,'abc016','abc015'),(2073,'abc013','abc016'),(2074,'abc002','abc017'),(2075,'abc007','abc018'),(2076,'abc007','abc019'),(2077,'abc007','abc020'),(2078,'abc007','abc021'),(2079,'abc011','abc022'),(2080,'abc011','abc023'),(2081,'abc013','abc024'),(2082,'abc016','abc025'),(2083,'abc013','abc026'),(2084,'abc002','abc027'),(2085,'abc007','abc028'),(2086,'abc007','abc029'),(2087,'abc007','abc030'),(2088,'abc007','abc031'),(2089,'abc011','abc032'),(2090,'abc011','abc033'),(2091,'abc013','abc034'),(2092,'abc016','abc035'),(2093,'abc013','abc036'),(2094,'0','abcdef');
/*!40000 ALTER TABLE `testm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-04  7:15:45
