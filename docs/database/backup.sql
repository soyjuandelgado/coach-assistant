USE coachassistant;

DROP TABLE IF EXISTS `coachee`;

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
  CONSTRAINT `FK_98753b82044db9a43e4bb0a52a8` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `coachee` WRITE;

INSERT INTO `coachee` VALUES ('22e07b20-671c-4141-b25e-3eebf007a0de','Ana','Bermúdez',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-29 09:40:15.215754','2025-10-29 09:40:15.215754',NULL,'0241cf11-82ba-4804-abe8-f1d958f30183'),('33b1f84a-e2d9-4730-9a70-9eb013577644','Prueba','Prueba',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-02 12:47:33.592028','2025-11-02 12:47:40.000000','2025-11-02 12:47:40.000000','0241cf11-82ba-4804-abe8-f1d958f30183'),('34201a69-a4a0-4475-b94c-fbd7fb67d011','Juan','Delgado','Ramos','soy.juan.delgado@gmail.com','Calle 1, 1º 1ª, Barcelona','(+34) 666 666 666','1979-02-27 00:00:00','00000000-H','Company SL','CEO','Calle 1, 1º 1ª, Barcelona','2025-10-22 19:35:35.282038','2025-10-27 20:39:16.000000',NULL,'0241cf11-82ba-4804-abe8-f1d958f30183'),('466c16f6-aecb-47f4-94da-aa4c34f023d1','Pedro','Pérez','Pérez','pedro@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-23 17:49:24.875637','2025-10-29 09:38:11.000000',NULL,'0241cf11-82ba-4804-abe8-f1d958f30183'),('6ced1fdd-5e86-43c4-a1ea-9a31e3917667','María','Sánchez','Ramírez',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-26 10:03:56.476588','2025-10-27 20:19:56.000000',NULL,'0241cf11-82ba-4804-abe8-f1d958f30183'),('765a5370-0f61-40c9-97c9-c3d34693de4b','Modificado','Modificado',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-23 17:59:50.803988','2025-10-23 18:26:26.000000','2025-10-23 18:26:26.000000','0241cf11-82ba-4804-abe8-f1d958f30183'),('ad03d8d5-a35e-47e0-a797-feed0c91a763','Prueba','ap1','ap2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-25 17:25:36.618436','2025-10-25 19:02:01.000000','2025-10-25 19:02:01.000000','0241cf11-82ba-4804-abe8-f1d958f30183'),('e16bd55b-b3cb-46da-b848-c1b73050e238','Paco','Martínez','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-23 17:28:16.058411','2025-10-27 20:26:33.000000',NULL,'0241cf11-82ba-4804-abe8-f1d958f30183'),('eea091a4-3dda-432e-b259-c49294727e08','Name2','Surname2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-10-22 19:47:53.030705','2025-10-25 18:38:09.000000','2025-10-25 18:38:09.000000','0241cf11-82ba-4804-abe8-f1d958f30183');

UNLOCK TABLES;



DROP TABLE IF EXISTS `note`;

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
  CONSTRAINT `FK_cc0c366b486e5036814f23e6a15` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `note` WRITE;

UNLOCK TABLES;



DROP TABLE IF EXISTS `process`;

CREATE TABLE `process` (
  `id` varchar(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `is_grow` tinyint(4) NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `coachee_id` varchar(36) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `frequency_days` int(11) DEFAULT NULL,
  `observations` text,
  `session_price` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_term_days` int(11) DEFAULT NULL,
  `contract_signed` tinyint(4) NOT NULL DEFAULT '0',
  `lodp_signed` tinyint(4) NOT NULL DEFAULT '0',
  `rgpd_signed` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_73a5fdc2da3ddbb6ce3a917c134` (`coachee_id`),
  CONSTRAINT `FK_73a5fdc2da3ddbb6ce3a917c134` FOREIGN KEY (`coachee_id`) REFERENCES `coachee` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




LOCK TABLES `process` WRITE;

INSERT INTO `process` VALUES ('41e66585-b7fc-48f0-bf37-27e5f6c15443','Personal',60,1,NULL,'2025-10-27 20:10:38.147816','2025-10-28 19:26:09.000000',NULL,'466c16f6-aecb-47f4-94da-aa4c34f023d1','2025-10-27 00:00:00',NULL,7,NULL,NULL,NULL,NULL,0,0,0),('4b8f31f5-1258-4da9-8824-2c4357340593','Directivo',90,1,'Facturar 20K con el nuevo producto para el 31/03/2026','2025-10-26 20:38:41.423366','2025-10-29 17:02:45.000000',NULL,'34201a69-a4a0-4475-b94c-fbd7fb67d011','2025-10-26 00:00:00',NULL,14,'Algunas observaciones importantes del proceso:\n- Va a ayudar mucho a la persona',50.05,'Tarjeta',30,1,1,1),('8d152386-5c3f-4fff-a4f2-f7878ddc2b95','Empresarial',90,0,NULL,'2025-10-29 09:50:16.397401','2025-10-29 09:50:16.397401',NULL,'22e07b20-671c-4141-b25e-3eebf007a0de',NULL,NULL,14,NULL,NULL,NULL,NULL,0,0,0),('8f0f8f62-63c6-4e8e-b527-ff96fc84d781','coaching',60,0,NULL,'2025-10-26 20:49:44.535232','2025-10-26 20:49:44.535232',NULL,'34201a69-a4a0-4475-b94c-fbd7fb67d011',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),('d546bb02-b622-449e-a76c-413953e84a89','mentoring',60,0,NULL,'2025-10-26 20:41:04.254462','2025-10-26 20:41:04.254462',NULL,'34201a69-a4a0-4475-b94c-fbd7fb67d011',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),('e5e26e20-30b4-4455-a155-4491217284bc','Personal',60,0,'Decidir siguiente paso','2025-10-27 11:40:54.322613','2025-10-27 11:40:54.322613',NULL,'34201a69-a4a0-4475-b94c-fbd7fb67d011',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0);

UNLOCK TABLES;



DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `admin_access` tinyint(4) NOT NULL DEFAULT '0',
  `coachees_access` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



LOCK TABLES `role` WRITE;

INSERT INTO `role` VALUES ('044de78f-d3a3-4074-a91a-d02fb60b2d53','admin','User with superpowers',1,1),('b1804b80-14ae-4163-aecc-c99c8630db8d','coach','User with full access to their coachees information',0,1);

UNLOCK TABLES;



DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` varchar(36) NOT NULL,
  `date` datetime NOT NULL,
  `session_number` int(11) NOT NULL,
  `is_grow` tinyint(4) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `process_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8e7de1745168e70897e8f80fb5b` (`process_id`),
  CONSTRAINT `FK_8e7de1745168e70897e8f80fb5b` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `session` WRITE;

INSERT INTO `session` VALUES ('672b3e36-fff3-48a7-b1ff-89ec9d9d81d0','2025-10-29 00:00:00',2,1,90,'Online','sfgd','2025-10-29 18:07:05.798496','2025-11-03 17:09:55.000000',NULL,'4b8f31f5-1258-4da9-8824-2c4357340593'),('f0b18bbb-0b6f-47fd-9bf4-1d3d82903256','2025-10-29 00:00:00',1,1,90,'Online','Definir el formato del producto y su precio','2025-10-29 10:14:31.709335','2025-10-29 18:06:31.000000',NULL,'4b8f31f5-1258-4da9-8824-2c4357340593');

UNLOCK TABLES;


DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `id` varchar(36) NOT NULL,
  `text` varchar(255) NOT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `commitment` int(11) DEFAULT NULL,
  `done` tinyint(4) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `session_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_929d02e1056afd838f2c2958684` (`session_id`),
  CONSTRAINT `FK_929d02e1056afd838f2c2958684` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `task` WRITE;

INSERT INTO `task` VALUES ('053b55a1-038f-415a-9cc7-b04cc97a0e3b','asdfgadf',NULL,NULL,0,'2025-11-03 17:10:04.312134','2025-11-03 17:10:04.312134',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('144a920e-21d3-4041-bafa-25df259a8124','asdfgasdg',NULL,NULL,0,'2025-11-01 10:37:15.612987','2025-11-01 10:37:15.612987',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('2822cd17-119d-412d-a9bf-9a95ccd33e4a','Example task','2025-10-20 10:30:00',8,0,'2025-11-01 11:40:48.070941','2025-11-01 11:40:48.070941',NULL,'f0b18bbb-0b6f-47fd-9bf4-1d3d82903256'),('3b81c324-7944-4c48-bc22-823c21426b9d','Example task3','2025-10-20 10:30:00',10,0,'2025-11-01 11:44:41.206642','2025-11-01 11:44:41.206642',NULL,'f0b18bbb-0b6f-47fd-9bf4-1d3d82903256'),('44307d2c-2ea0-4ad0-b9c7-929ed50e8640','plan de accion 2',NULL,NULL,0,'2025-11-01 10:37:33.127332','2025-11-01 10:37:33.127332',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('7b6428ef-2f92-416c-bf5a-beb821a2a2f4','asdf',NULL,NULL,0,'2025-11-03 19:18:05.537353','2025-11-03 19:18:05.537353',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('9f006c1a-8cb9-4094-8c2b-a2837579d9ef','asdf',NULL,NULL,0,'2025-11-03 19:18:06.218044','2025-11-03 19:18:06.218044',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('c6b585aa-6573-4c65-bf62-8f43e67910c8','asdf',NULL,NULL,0,'2025-11-03 19:18:05.165411','2025-11-03 19:18:05.165411',NULL,'672b3e36-fff3-48a7-b1ff-89ec9d9d81d0'),('e23da6a7-19a9-4b47-9124-32eb42027d97','Example task2','2025-10-20 10:30:00',8,0,'2025-11-01 11:44:25.834839','2025-11-01 11:44:25.834839',NULL,'f0b18bbb-0b6f-47fd-9bf4-1d3d82903256');

UNLOCK TABLES;



DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




LOCK TABLES `user` WRITE;

INSERT INTO `user` VALUES ('0241cf11-82ba-4804-abe8-f1d958f30183','a@a.com','$2b$10$wdVTOi2abJMyvs8xdE627O8VVfIym./RDLVvLT1NGV11L0D5hYdOa',NULL,'2025-10-24 08:12:44.401074','2025-11-01 20:46:52.000000'),('144d8f24-5881-4bee-93f2-485f402edf1b','user2@user.com','$2b$10$10cIKpxBUDECfhua24aj6uAKI22KfS6035eSSSaA87hDlLz04173e',NULL,'2025-11-01 20:20:49.606833','2025-11-01 20:20:49.606833'),('2fc1326a-f709-4409-9f20-9ba69b8a79e2','user@user.com','asdfA2T3Wer*tdfa_sdf',NULL,'2025-10-24 08:12:44.401074','2025-10-24 08:12:44.487335'),('6462ceee-f18a-4ff9-af22-98edb57134b5','a@a.com','$2b$10$gIhMtmSJ2wtJ36gp/.zy7uU8Gon0kRyNsIgNYETlbIb4DpZ1CMY5q',NULL,'2025-11-01 20:35:18.300241','2025-11-01 20:35:18.300241'),('804b873c-0c7e-4fa7-a39b-36310ac32b63','a@a.com','$2b$10$Zl.x9zf2cfMYKeM4ZNPuu.Nl7luzuPw7o1ACocITeOuTM3YVTI5XC',NULL,'2025-11-01 20:34:53.321017','2025-11-01 20:34:53.321017'),('aa5224b3-9656-479a-8492-003d64e347ca','a@a.com','$2b$10$yHmixx9Lzu2y8XdPqlQNkOLPewSIlb9BOqV5eaWpm.qRfFLgTjpyO',NULL,'2025-11-01 20:27:10.389501','2025-11-01 20:27:10.389501'),('d790b228-5daf-41da-9742-561b3b8fc606','user2@user.com','$2b$10$kvYKCN.wxo.AhX86oszZ0e89a3E3iAL3p0msIkUtKV8g.4SsGIcjS',NULL,'2025-11-01 20:16:57.092682','2025-11-01 20:16:57.092682');

UNLOCK TABLES;



DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE `user_roles` (
  `user_id` varchar(36) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_87b8888186ca9769c960e92687` (`user_id`),
  KEY `IDX_b23c65e50a758245a33ee35fda` (`role_id`),
  CONSTRAINT `FK_87b8888186ca9769c960e926870` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b23c65e50a758245a33ee35fda1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




LOCK TABLES `user_roles` WRITE;

INSERT INTO `user_roles` VALUES ('0241cf11-82ba-4804-abe8-f1d958f30183','044de78f-d3a3-4074-a91a-d02fb60b2d53'),('0241cf11-82ba-4804-abe8-f1d958f30183','b1804b80-14ae-4163-aecc-c99c8630db8d');

UNLOCK TABLES;

