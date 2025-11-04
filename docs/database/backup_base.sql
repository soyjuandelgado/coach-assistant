-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: coachassistant
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `coachassistant`
--

-- CREATE DATABASE /*!32312 IF NOT EXISTS*/ `coachassistant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- USE `coachassistant`;

--
-- Table structure for table `coachee`
--

DROP TABLE IF EXISTS `coachee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coachee` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `company_role` varchar(255) DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_98753b82044db9a43e4bb0a52a8` (`user_id`),
  CONSTRAINT `FK_98753b82044db9a43e4bb0a52a8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coachee`
--

LOCK TABLES `coachee` WRITE;
/*!40000 ALTER TABLE `coachee` DISABLE KEYS */;
INSERT INTO `coachee` VALUES ('7bb8afea-4129-4f38-9853-3acdbfc94f22','José','García','Sánchez','jose@gmail.com','Calle 1, 1o, 08001, Barcelona','(+34) 666 666 666','2020-11-01 00:00:00','00000000-H','Productos García SL','CEO','Empresa 1, 08001, Barcelona','2025-11-04 10:27:18.540026','2025-11-04 10:51:00.000000',NULL,'be1e3ec9-02e2-4bff-a8e5-329db9e206a6'),('950d23ff-ae25-45d3-a047-f263848b5083','María','Pérez','Ramírez','maria@gmail.com','','(+34) 654 987 321','2005-03-30 00:00:00','',NULL,NULL,NULL,'2025-11-04 10:37:02.052142','2025-11-04 10:55:06.000000',NULL,'be1e3ec9-02e2-4bff-a8e5-329db9e206a6');
/*!40000 ALTER TABLE `coachee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` varchar(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `session_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cc0c366b486e5036814f23e6a15` (`session_id`),
  CONSTRAINT `FK_cc0c366b486e5036814f23e6a15` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES ('04628efb-95ff-4c20-9333-7bc352a241a8','O','El producto 2 tiene un gran público pero es más caro','2025-11-04 11:30:22.343405','2025-11-04 11:30:22.343405',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('08dd4238-eabf-481f-9a7f-408b15b07c5a','O','El producto 3 es para un nicho reducido y más exclusivo','2025-11-04 11:30:42.026901','2025-11-04 11:30:42.026901',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('22ee158e-f6f9-40d8-90a4-726318c23d69','G','Quiere decidir que producto es el más adecuado','2025-11-04 11:27:20.628963','2025-11-04 11:27:20.628963',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('42ce2cfd-310f-45bf-93d1-779d920e8ae7','E','Motivado','2025-11-04 11:20:59.372937','2025-11-04 11:20:59.372937',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('50de9f7b-9ecd-4b47-a55b-2e4895fdfdc0','R','Los productos que tienen no se demandan tanto','2025-11-04 11:28:29.608920','2025-11-04 11:28:29.608920',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('5427783d-c9d3-4bc1-a482-5ec46580be54','R','La fábrica tiene demasiado tiempo libre','2025-11-04 11:28:09.305622','2025-11-04 11:28:09.305622',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('5742e286-dcc1-4dd6-b960-744c8b44c489','O','Producto 2 más adecuado en cuanto a precio y producción','2025-11-04 11:32:07.180284','2025-11-04 11:32:07.180284',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('59169718-380e-4dbd-a71b-44ba8fddb463','N','No se siente respaldado por el equipo','2025-11-04 11:17:56.135759','2025-11-04 11:17:56.135759',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('61983635-3825-491e-b476-3acb9270758c','I','Semana complicada','2025-11-04 11:25:50.386748','2025-11-04 11:25:50.386748',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('70af0740-c135-4e03-9336-d21c5894a539','G','Han hecho la reunión y tiene las 3 opciones','2025-11-04 11:26:59.526146','2025-11-04 11:26:59.526146',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('819ac4cb-2650-47ba-a5a2-e64aa2789a0e','N','Quiere diseñar un nuevo producto','2025-11-04 11:17:00.877356','2025-11-04 11:17:00.877356',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('832e7517-642f-4fee-b7f6-89708838e6dd','N','50 trabajadores','2025-11-04 11:16:30.422524','2025-11-04 11:16:30.422524',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('92d1f609-25e1-4e21-8af7-2a044509ba86','R','Necesita empezar una nueva producción','2025-11-04 11:28:53.938453','2025-11-04 11:28:53.938453',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('9ebc74c3-c052-412a-bc34-e950bce90edc','O','El producto 1 es económico y hay que vender mucha cantidad','2025-11-04 11:29:56.814216','2025-11-04 11:29:56.814216',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('b6446321-c351-45b1-948a-4fd06c0e9189','E','Tranquilo','2025-11-04 11:35:12.721448','2025-11-04 11:35:12.721448',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('b77d0e41-1178-449e-a116-aaccc49e795f','O','Producto 1 saturaría fábrica','2025-11-04 11:31:25.177712','2025-11-04 11:31:25.177712',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('c4f74866-39f0-4b3e-8fd7-756027061dd9','N','Fabrica productos de uso personal','2025-11-04 11:16:12.649175','2025-11-04 11:16:12.649175',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('d0e2d4ed-9993-48f3-8694-cb6a8244380e','I','Enfrentamiento con el diseñador','2025-11-04 11:26:18.829000','2025-11-04 11:26:18.829000',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('e5fd921f-1301-4d06-8e73-2587ee18b5a3','O','Producto 3 costará de vender','2025-11-04 11:31:45.455327','2025-11-04 11:31:45.455327',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('e693f6a6-180a-4715-8f02-68abf40757ce','W','Duda si su diseñador es el más adecuado','2025-11-04 11:34:16.831729','2025-11-04 11:34:16.831729',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('e82af76a-0042-4f03-a237-3b9a7b606720','W','Tiene que saber los costes reales de fabricación y venta','2025-11-04 11:32:33.246081','2025-11-04 11:32:33.246081',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('ef163a38-72a7-4c8c-94dd-045f59a1212d','E','Nervioso','2025-11-04 11:25:10.539791','2025-11-04 11:25:10.539791',NULL,'596d3444-dc14-47de-8691-51e3824d539b');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` varchar(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `duration_minutes` int NOT NULL,
  `is_grow` tinyint NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `frequency_days` int DEFAULT NULL,
  `observations` text,
  `session_price` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_term_days` int DEFAULT NULL,
  `contract_signed` tinyint NOT NULL DEFAULT '0',
  `lodp_signed` tinyint NOT NULL DEFAULT '0',
  `rgpd_signed` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `coachee_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_73a5fdc2da3ddbb6ce3a917c134` (`coachee_id`),
  CONSTRAINT `FK_73a5fdc2da3ddbb6ce3a917c134` FOREIGN KEY (`coachee_id`) REFERENCES `coachee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES ('7b8095ec-10e9-40b2-a68c-85d74f0f20fa','Empresarial',90,0,'Aumentar las ventas un 30% para el 31/03/2026','2025-11-04 00:00:00',NULL,14,NULL,90.00,'Transferencia',30,1,1,1,'2025-11-04 10:53:41.870920','2025-11-04 10:53:41.870920',NULL,'7bb8afea-4129-4f38-9853-3acdbfc94f22'),('b8157008-b0c7-4748-8100-35ab467c1788','Personal',60,1,'Aumentar la autoestima','2025-11-03 00:00:00',NULL,7,NULL,50.00,'Tarjeta',0,1,1,0,'2025-11-04 10:57:00.793455','2025-11-04 10:57:31.000000',NULL,'950d23ff-ae25-45d3-a047-f263848b5083');
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `admin_access` tinyint NOT NULL DEFAULT '0',
  `coachees_access` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('2499ac87-2ca4-4953-adff-5e944d4793fc','coach','User with access to coachees',0,1),('847a35e5-9183-42da-8c57-54994ea5fcac','admin','Superpowered user',1,1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` varchar(36) NOT NULL,
  `date` datetime NOT NULL,
  `session_number` int NOT NULL,
  `is_grow` tinyint NOT NULL,
  `duration_minutes` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `process_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8e7de1745168e70897e8f80fb5b` (`process_id`),
  CONSTRAINT `FK_8e7de1745168e70897e8f80fb5b` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('4e329e51-9059-4b8e-a245-21d21fcea402','2025-11-04 00:00:00',1,0,90,'Oficina','Sesión inicial de toma de datos','2025-11-04 11:15:21.266181','2025-11-04 11:19:10.000000',NULL,'7b8095ec-10e9-40b2-a68c-85d74f0f20fa'),('596d3444-dc14-47de-8691-51e3824d539b','2025-11-04 00:00:00',2,1,90,'Online','Decidir producto a fabricar','2025-11-04 11:24:33.109133','2025-11-04 11:25:40.000000',NULL,'7b8095ec-10e9-40b2-a68c-85d74f0f20fa');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `commitment` int DEFAULT NULL,
  `done` tinyint NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `session_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_929d02e1056afd838f2c2958684` (`session_id`),
  CONSTRAINT `FK_929d02e1056afd838f2c2958684` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('3ac8b2f6-5a9f-4e1b-b04b-9fd9382e9c61','17/10/2025 Listar los pros y contras del diseñador actual. 8/10',NULL,NULL,0,'2025-11-04 11:33:54.740442','2025-11-04 11:33:54.740442',NULL,'596d3444-dc14-47de-8691-51e3824d539b'),('ab004683-f430-4fd9-83d9-599c23b7c855','07/11/2025 Reunión con el equipo y conseguir 3 productos viables. Compromiso 9/10',NULL,NULL,0,'2025-11-04 11:20:40.493292','2025-11-04 11:20:40.493292',NULL,'4e329e51-9059-4b8e-a245-21d21fcea402'),('bf20eb52-9335-4f48-8092-e7a7c9379b21','15/11/2025 Reunión con el equipo para calcular costes y precio de venta. 10/10',NULL,NULL,0,'2025-11-04 11:33:18.148604','2025-11-04 11:33:18.148604',NULL,'596d3444-dc14-47de-8691-51e3824d539b');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0e13700a-1ed9-4c34-ab4c-e37aed6ecd25','user@user.com','$2b$10$831O3.ehcUuCQ8PxFl0MDOC0XEdZPmzZ1rKzlWQOS1aseFE0Drn/m','2025-11-04 09:28:45.960019','2025-11-04 09:28:45.960019',NULL),('be1e3ec9-02e2-4bff-a8e5-329db9e206a6','a@a.com','$2b$10$CeyUBRTrYNUW6ng5SmyoROhoNHX4694xc38aGEFfBaC3Nl2FMCS.m','2025-11-04 09:21:04.715202','2025-11-04 09:21:04.715202',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` varchar(36) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_87b8888186ca9769c960e92687` (`user_id`),
  KEY `IDX_b23c65e50a758245a33ee35fda` (`role_id`),
  CONSTRAINT `FK_87b8888186ca9769c960e926870` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b23c65e50a758245a33ee35fda1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('0e13700a-1ed9-4c34-ab4c-e37aed6ecd25','2499ac87-2ca4-4953-adff-5e944d4793fc'),('be1e3ec9-02e2-4bff-a8e5-329db9e206a6','2499ac87-2ca4-4953-adff-5e944d4793fc'),('be1e3ec9-02e2-4bff-a8e5-329db9e206a6','847a35e5-9183-42da-8c57-54994ea5fcac');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'coachassistant'
--

--
-- Dumping routines for database 'coachassistant'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 15:28:49
