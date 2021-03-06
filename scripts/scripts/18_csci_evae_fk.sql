
ALTER TABLE QUESTION_EVALUATION ADD (CONSTRAINT
 QEV_QUE_FK FOREIGN KEY 
  (ID_QUESTION) REFERENCES QUESTION
  (ID_QUESTION))
;

ALTER TABLE QUESTION_EVALUATION ADD (CONSTRAINT
 QEV_REV_FK FOREIGN KEY 
  (ID_RUBRIQUE_EVALUATION) REFERENCES RUBRIQUE_EVALUATION
  (ID_RUBRIQUE_EVALUATION))
;

ALTER TABLE QUESTION_EVALUATION ADD (CONSTRAINT
 QEV_QUA_FK FOREIGN KEY 
  (ID_QUALIFICATIF) REFERENCES QUALIFICATIF
  (ID_QUALIFICATIF))
;

ALTER TABLE EVALUATION ADD (CONSTRAINT
 EVE_PRO_FK FOREIGN KEY 
  (CODE_FORMATION
  ,ANNEE_PRO) REFERENCES PROMOTION
  (CODE_FORMATION
  ,ANNEE_PRO))
;

ALTER TABLE EVALUATION ADD (CONSTRAINT
 EVE_UE_FK FOREIGN KEY 
  (CODE_FORMATION
  ,CODE_UE) REFERENCES UNITE_ENSEIGNEMENT
  (CODE_FORMATION
  ,CODE_UE))
;

ALTER TABLE EVALUATION ADD (CONSTRAINT
 EVE_EC_FK FOREIGN KEY 
  (CODE_FORMATION
  ,CODE_UE
  ,CODE_EC) REFERENCES ELEMENT_CONSTITUTIF
  (CODE_FORMATION
  ,CODE_UE
  ,CODE_EC))
;

ALTER TABLE EVALUATION ADD (CONSTRAINT
 EVE_ENS_FK FOREIGN KEY 
  (NO_ENSEIGNANT) REFERENCES ENSEIGNANT
  (NO_ENSEIGNANT))
;

ALTER TABLE RUBRIQUE ADD (CONSTRAINT
 RUB_ENS_FK FOREIGN KEY 
  (NO_ENSEIGNANT) REFERENCES ENSEIGNANT
  (NO_ENSEIGNANT))
;

ALTER TABLE RUBRIQUE_QUESTION ADD (CONSTRAINT
 RBQ_QUE_FK FOREIGN KEY 
  (ID_QUESTION) REFERENCES QUESTION
  (ID_QUESTION))
;

ALTER TABLE RUBRIQUE_QUESTION ADD (CONSTRAINT
 RBQ_RUB_FK FOREIGN KEY 
  (ID_RUBRIQUE) REFERENCES RUBRIQUE
  (ID_RUBRIQUE))
;

ALTER TABLE RUBRIQUE_EVALUATION ADD (CONSTRAINT
 REV_RUB_FK FOREIGN KEY 
  (ID_RUBRIQUE) REFERENCES RUBRIQUE
  (ID_RUBRIQUE))
;

ALTER TABLE RUBRIQUE_EVALUATION ADD (CONSTRAINT
 REV_EVE_FK FOREIGN KEY 
  (ID_EVALUATION) REFERENCES EVALUATION
  (ID_EVALUATION))
;

ALTER TABLE DROIT ADD (CONSTRAINT
 DRT_ENS_FK FOREIGN KEY 
  (NO_ENSEIGNANT) REFERENCES ENSEIGNANT
  (NO_ENSEIGNANT))
;

ALTER TABLE DROIT ADD (CONSTRAINT
 DRT_EVE_FK FOREIGN KEY 
  (ID_EVALUATION) REFERENCES EVALUATION
  (ID_EVALUATION))
;

ALTER TABLE QUESTION ADD (CONSTRAINT
 QUE_QUA_FK FOREIGN KEY 
  (ID_QUALIFICATIF) REFERENCES QUALIFICATIF
  (ID_QUALIFICATIF))
;

ALTER TABLE QUESTION ADD (CONSTRAINT
 QUE_ENS_FK FOREIGN KEY 
  (NO_ENSEIGNANT) REFERENCES ENSEIGNANT
  (NO_ENSEIGNANT))
;

ALTER TABLE REPONSE_QUESTION ADD (CONSTRAINT
 RPQ_QEV_FK FOREIGN KEY 
  (ID_QUESTION_EVALUATION) REFERENCES QUESTION_EVALUATION
  (ID_QUESTION_EVALUATION))
;

ALTER TABLE REPONSE_QUESTION ADD (CONSTRAINT
 RPQ_RPE_FK FOREIGN KEY 
  (ID_REPONSE_QUESTION) REFERENCES REPONSE_EVALUATION
  (ID_REPONSE_EVALUATION))
;

ALTER TABLE REPONSE_EVALUATION ADD (CONSTRAINT
 RPE_EVE_FK FOREIGN KEY 
  (ID_EVALUATION) REFERENCES EVALUATION
  (ID_EVALUATION))
;

ALTER TABLE REPONSE_EVALUATION ADD (CONSTRAINT
 RPE_ETU_FK FOREIGN KEY 
  (NO_ETUDIANT_NAT) REFERENCES ETUDIANT
  (NO_ETUDIANT_NAT))
;


