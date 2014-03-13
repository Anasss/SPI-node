
CREATE INDEX QEV_QUE_FK_I ON QUESTION_EVALUATION
 (ID_QUESTION)
;

CREATE INDEX QEV_QUA_FK_I ON QUESTION_EVALUATION
 (ID_QUALIFICATIF)
;

CREATE INDEX QEV_REV_FK_I ON QUESTION_EVALUATION
 (ID_RUBRIQUE_EVALUATION)
;

CREATE INDEX EVE_EC_FK_I ON EVALUATION
 (CODE_EC)
;

CREATE INDEX EVE_PRO_FK_I ON EVALUATION
 (ANNEE_PRO)
;

CREATE INDEX EVE_ENS_FK_I ON EVALUATION
 (NO_ENSEIGNANT)
;

CREATE INDEX EVE_UE_FK_I ON EVALUATION
 (CODE_FORMATION
 ,CODE_UE)
;

CREATE INDEX RUB_ENS_FK_I ON RUBRIQUE
 (NO_ENSEIGNANT)
;

CREATE INDEX RBQ_RUB_FK_I ON RUBRIQUE_QUESTION
 (ID_RUBRIQUE)
;

CREATE INDEX RBQ_QUE_FK_I ON RUBRIQUE_QUESTION
 (ID_QUESTION)
;

CREATE INDEX REV_RUB_FK_I ON RUBRIQUE_EVALUATION
 (ID_RUBRIQUE)
;

CREATE INDEX REV_EVE_FK_I ON RUBRIQUE_EVALUATION
 (ID_EVALUATION)
;

CREATE INDEX DRT_EVE_FK_I ON DROIT
 (ID_EVALUATION)
;

CREATE INDEX DRT_ENS_FK_I ON DROIT
 (NO_ENSEIGNANT)
;

CREATE INDEX QUE_QUA_FK_I ON QUESTION
 (ID_QUALIFICATIF)
;

CREATE INDEX QUE_ENS_FK_I ON QUESTION
 (NO_ENSEIGNANT)
;

CREATE INDEX RPQ_RPE_FK_I ON REPONSE_QUESTION
 (ID_REPONSE_QUESTION)
;

CREATE INDEX RPQ_QEV_FK_I ON REPONSE_QUESTION
 (ID_QUESTION_EVALUATION)
;

CREATE INDEX RPE_EVE_FK_I ON REPONSE_EVALUATION
 (ID_EVALUATION)
;

CREATE INDEX RPE_ETU_FK_I ON REPONSE_EVALUATION
 (NO_ETUDIANT_NAT)
;

