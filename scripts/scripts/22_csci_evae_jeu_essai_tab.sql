--
-- Contenu de la table `evaluation`
--

INSERT INTO `evaluation` (`NO_ENSEIGNANT`, `CODE_FORMATION`, `ANNEE_PRO`, `CODE_UE`, `CODE_EC`, `NO_EVALUATION`, `DESIGNATION`, `ETAT`, `PERIODE`, `DEBUT_REPONSE`, `FIN_REPONSE`) VALUES
('1', 'M2DOSI', '2012-2013', 'SRE', 'SD', '1', 'Evaluation ISI', 'CLO', 'Du 2012-10-10 Au 2012-11-15', '2012-10-10 00:00:00', '2012-11-15 00:00:00'),
('2', 'M2DOSI', '2012-2013', 'WEB', 'AA', '2', 'Evaluation Web', 'CLO', 'Du 2012-10-10 Au 2012-11-15', '2012-10-10 00:00:00', '2012-11-15 00:00:00'),
('3', 'M2DOSI', '2012-2013', 'WEB', 'AA', '4', 'Evaluation WEB', 'DIS', 'Du 2013-10-16 Au 2013-12-20', '2013-10-16 00:00:00', '2013-12-20 00:00:00'),
('1', 'M2DOSI', '2012-2013', 'ISI', 'BB', '3', 'Evaluation SRE', 'ELA', 'Du 2013-01-12 Au 2013-02-17', '2013-01-12 00:00:00', '2013-02-17 00:00:00'),
('2', 'M2DOSI', '2012-2013', 'WEB', NULL, '6', 'Evaluation SRE', 'DIS', 'Du 2012-11-11 Au 2012-12-15', '2012-11-11 00:00:00', '2012-12-15 00:00:00'),
('3', 'M2DOSI', '2012-2013', 'SRE', NULL, '5', 'Evaluation SRE', 'ELA', 'Du 2013-04-16 Au 2013-05-20', '2013-04-16 00:00:00', '2013-05-20 00:00:00');

--
-- Contenu de la table `qualificatif`
--

INSERT INTO `qualificatif` (`MINIMAL`, `MAXIMAL`) VALUES
('Faible', 'Forte'),
('Insuffisant', 'Suffisant'),
('Pauvre', 'Riche'),
('Facile', 'Difficile'),
('Peu clair', 'Très clair');


--
-- Contenu de la table `question`
--

INSERT INTO `question` (`TYPE`, `NO_ENSEIGNANT`, `ID_QUALIFICATIF`, `INTITULE`) VALUES
('QUP', '1', '3', 'Contenu'),
('QUS', '30', '4', 'Assimilabilité'),
('QUP', '2', '2', 'Nombre de séances'),
('QUS', '3', '1', 'Qualité pédagogique de l’enseignant'),
('QUS', '1', '5', 'Clarté des énoncés'),
('QUP', '3', '1', 'Disponinilité de l’enseignant');


--
-- Contenu de la table `rubrique`
--

INSERT INTO `rubrique` (`TYPE`, `DESIGNATION`, `ORDRE`, `NO_ENSEIGNANT`) VALUES
('RBS', 'Cours Magistraux', 1, '1'),
('RBS', 'Travaux Dirigés', 2, '2'),
('RBS', 'Travaux Pratiques', 3, '30'),
('RBP', 'Contrôle Continue', 4, '3');


--
-- Contenu de la table `rubrique_question`
--

INSERT INTO `rubrique_question` (`ID_RUBRIQUE`, `ID_QUESTION`, `ORDRE`) VALUES
('2', '1', 1),
('2', '2', 2),
('2', '3', 3),
('2', '4', 4),
('2', '5', 5),
('2', '6', 6);


--
-- Contenu de la table `rubrique_evaluation`
--

Insert into `RUBRIQUE_EVALUATION` (`ID_EVALUATION`, `ID_RUBRIQUE`, `ORDRE`,`DESIGNATION` )
values 
('1', '1', '1', 'Cours Magistraux'),
('1', '2', '2', 'Travaux Dirigés'),
('3', '3', '3', 'Travaux Pratiques'),
('2', '1', '4', 'Cours Magistraux'),
('5', '2', '5', 'Travaux Dirigés'),
('2', '3', '6', 'Travaux Pratiques'),
('4', '1', '7', 'Cours Magistraux'),
('4', '2', '8', 'Travaux Dirigés'),
('6', '3', '9', 'Travaux Pratiques');


