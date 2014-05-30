-- MySQL dump 10.13  Distrib 5.5.35, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: makinvoice_db
-- ------------------------------------------------------
-- Server version	5.5.35-0ubuntu0.12.04.2

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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('Retail Electricity Suppliers Association','Retail Electricity Suppliers Association','+632.224.2169','+632.224.2170',1,1,1,'2014-05-12 14:24:22','2014-05-12 14:24:22'),('Marriott Hotel Manila','Marriott Manila','Marketing Communications','Newport Boulevard , Newport City, Pasay, Philippines',1,1,2,'2014-05-29 15:02:18','2014-05-29 15:02:18');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice` (
  `invoice_number` varchar(255) DEFAULT NULL,
  `date_generated` int(11) DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `footer_note` varchar(255) DEFAULT NULL,
  `footer_name` varchar(255) DEFAULT NULL,
  `footer_description` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `joborder_id` varchar(255) DEFAULT NULL,
  `paid_date` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joborder`
--

DROP TABLE IF EXISTS `joborder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joborder` (
  `ticket_number` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `requested_by` varchar(255) DEFAULT NULL,
  `date_requested` int(11) DEFAULT NULL,
  `date_completed` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joborder`
--

LOCK TABLES `joborder` WRITE;
/*!40000 ALTER TABLE `joborder` DISABLE KEYS */;
INSERT INTO `joborder` VALUES ('RESA-2014-000001','WebSite Design & Development','',1393689600,1399046400,'Website Deployed on Production Server',0,2,1,1,'2014-05-12 14:25:17','2014-05-12 14:34:31'),('RESA-2014-000002','Deploy Website to Test Server','',1396368000,1399046400,'Website Deployed to Live Server',0,2,1,2,'2014-05-12 14:26:00','2014-05-12 14:34:54'),('RESA-2014-000003','Encode Members Information','',1397577600,1399046400,'All members are encoded & included on the RESA website',0,2,1,3,'2014-05-12 14:26:20','2014-05-12 14:35:26'),('RESA-2014-000004','iStock Photos','',1398614400,1399046400,'iStock Photos are purchased and are now used on the website',0,2,1,4,'2014-05-12 14:26:45','2014-05-12 14:35:55'),('RESA-2014-000005','Deploy website to Live server','',1399046400,1399046400,'Website deployed to live server',0,2,1,5,'2014-05-12 14:27:43','2014-05-12 14:36:36'),('RESA-2014-000006','Initial SEO Settings for Website','',1399046400,1399046400,'SEO settings are active already',0,2,1,6,'2014-05-12 14:28:31','2014-05-12 14:36:52'),('RESA-2014-000007','Minimal Revisions (contact us page & VECO member)','',1399910400,1399910400,'Resolved: modified the typo and replaced VECO logo',0,2,1,7,'2014-05-12 14:29:40','2014-05-12 14:37:18'),('MHM-EDM-2014-000008','EDM - Blast: Gong Xi Fa Cai','Jane Manzanero',1389369600,1389369600,'Email Blasted / Sent',0,2,2,8,'2014-05-29 15:04:35','2014-05-29 15:08:32'),('MHM-EDM-2014-000009','EDM - Aussie Overload at Marriott Hotel Manila','Jane Manzanero',1389369600,1389801600,'Email Blasted / Sent',0,2,2,9,'2014-05-29 15:05:04','2014-05-29 15:09:57'),('MHM-EDM-2014-000010','EDM - Re-blast: Gong Xi Fa Cai','Jane Manzanero',1390579200,1390579200,'Email Scheduled @ 3PM',0,2,2,10,'2014-05-29 15:05:42','2014-05-29 15:11:19'),('MHM-EDM-2014-000011','Send Campaign Statistics','',1390579200,1390838400,'Campaign Statistics Sent via Email (2 Campaigns)',0,2,2,11,'2014-05-29 15:06:15','2014-05-29 15:11:41'),('MHM-EDM-2014-000012','EDM - February Promotions','Jane Manzanero',1391788800,1392048000,'Email Sent @ 5PM',0,2,2,12,'2014-05-29 15:06:40','2014-05-29 15:12:14'),('MHM-EDM-2014-000013','EDM - 10 for Free','Jane Manzanero',1392825600,1392998400,'Email Scheduled @ 3PM',0,2,2,13,'2014-05-29 15:07:13','2014-05-29 15:13:14'),('MHM-EDM-2014-000014','EDM - 20% off at Marriott Cafe','Jane Manzanero',1394035200,1394121600,'Email Sent',0,2,2,14,'2014-05-29 15:07:42','2014-05-29 15:13:46'),('MHM-EDM-2014-000015','EDM - Bigger and Better Sunday Brunch','Jane Manzanero',1401206400,1401465600,'Scheduled @ 5PM',0,2,2,15,'2014-05-29 15:14:49','2014-05-30 16:50:56'),('RESA-2014-000016','Content Update: Team Energy Address','Ms. Jen',1401292800,NULL,'',0,0,1,16,'2014-05-29 16:22:48','2014-05-29 16:22:48'),('RESA-2014-000017','Website Analytics','--System Generated--',1401465600,NULL,'',0,0,1,17,'2014-05-29 16:23:31','2014-05-29 16:23:31'),('RESA-2014-000018','Change Featured Member','--System Generated--',1401465600,NULL,'',0,0,1,18,'2014-05-29 16:24:09','2014-05-29 16:24:09'),('RESA-2014-000019','Google App for Business Analytics','--System Generated--',1401465600,NULL,'',0,0,1,19,'2014-05-29 16:24:32','2014-05-29 16:24:32'),('MHM-EDM-2014-000020','Send Campaign Statistics','--System Generated--',1404489600,NULL,'',0,0,2,20,'2014-05-30 16:51:30','2014-05-30 16:51:31');
/*!40000 ALTER TABLE `joborder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `project_code` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('Resa Website','Website for RESA','RESA',1,1,1,1,'2014-05-12 14:24:32','2014-05-12 14:24:32'),('Marriott EDM','Local newsletter for Marriott','MHM-EDM',2,1,1,2,'2014-05-29 15:03:01','2014-05-29 15:03:01');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('makmak','$2a$10$2HHF.1U/8cxDkTwmZgI14uMf7Inji6FGDJ.VZxVGU3yshYNZzCgES','admin',1,'2014-05-30 13:49:47','2014-05-30 13:49:47');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-31  1:21:54
