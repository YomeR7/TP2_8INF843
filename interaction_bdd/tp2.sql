
CREATE DATABASE IF NOT EXISTS `tp2` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tp2`;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `RESERVATION`;
DROP TABLE IF EXISTS `ETAPE`;
DROP TABLE IF EXISTS `TRAJET`;
DROP TABLE IF EXISTS `USER`;

-- --------------------------------------------------------

CREATE TABLE `USER` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l''utilisateur',
  `login` varchar(30) NOT NULL COMMENT 'Login de l''utilisateur',
  `mdp` varchar(64) NOT NULL COMMENT 'Mot de passe de l''utilisateur',
  `nom` varchar(30) NOT NULL COMMENT 'Nom de l''utilisateur',
  `prenom` varchar(30) NOT NULL COMMENT 'Prenom de l''utilisateur',
  `email` varchar(90) NOT NULL COMMENT 'Mail de l''utilisateur',
  `tel` varchar(12) DEFAULT NULL COMMENT 'Tel de l''utilisateur',
  `prefs` text COMMENT 'Preferences de l''utilisateur',
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



CREATE TABLE `TRAJET` (
  `id_trajet` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID du trajet',
  `id_conducteur` int(11) NOT NULL COMMENT 'ID du conducteur du vehicule',
  		FOREIGN KEY (`id_conducteur`) REFERENCES `USER`(`id_user`),
  `date` date NOT NULL COMMENT 'Date du trajet',
  `h_dep` time NOT NULL COMMENT 'Heure de depart du trajet',
  `h_arr` time NOT NULL COMMENT 'Heure d''arrive du trajet',
  `lieu_dep` varchar(80) NOT NULL COMMENT 'Lieu de depart du trajet',
  `lieu_arr` varchar(80) NOT NULL COMMENT 'Lieu d''arrive du trajet',
  `nb_places_tot` int(11) NOT NULL COMMENT 'Nombre de places totales disponibles dans le vehicule',
  PRIMARY KEY (`id_trajet`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


CREATE TABLE `ETAPE` (
  `id_trajet` int(11) NOT NULL,
  		FOREIGN KEY (`id_trajet`) REFERENCES `TRAJET`(`id_trajet`),
  `num_etape` int(11) NOT NULL,
  `nom_etape` varchar(80) NOT NULL,
  PRIMARY KEY (`id_trajet`,`num_etape`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



CREATE TABLE `RESERVATION` (
  `id_user` int(11) NOT NULL COMMENT 'ID de l''utilisateur ayant reserve',
  		FOREIGN KEY (`id_user`) REFERENCES `USER`(`id_user`),
  `id_trajet` int(11) NOT NULL COMMENT 'ID du trajet reserve',
  		FOREIGN KEY (`id_trajet`) REFERENCES `TRAJET`(`id_trajet`),
  `nb_place` int(11) NOT NULL COMMENT 'Nombre de places reserve',
  `etape_dep` int(11) DEFAULT NULL COMMENT 'Etape de depart (s''il y en a une)',
  		FOREIGN KEY (`etape_dep`) REFERENCES `ETAPE`(`num_etape`),
  `etape_arr` int(11) DEFAULT NULL COMMENT 'Etape d''arrive (s''il y en a une)',
  		FOREIGN KEY (`etape_arr`) REFERENCES `ETAPE`(`num_etape`),
  PRIMARY KEY (`id_user`,`id_trajet`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;