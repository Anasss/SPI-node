ALTER VIEW V_EVALUATION
 (EVE_ANNEE_PRO
 ,FRM_CODE_FORMATION
 ,EVE_PERIODE
 ,EVE_DESIGNATION
 ,EVE_ETAT
 ,EVE_ID_EVALUATION
 ,UE_DESIGNATION
 ,ENS_NOM
 ,ENS_NO_ENSEIGNANT
 ,SIGNIFICATION)
 AS SELECT EVE.ANNEE_PRO EVE_ANNEE_PRO
          ,FRM.CODE_FORMATION FRM_CODE_FORMATION
          ,EVE.PERIODE EVE_PERIODE
          ,EVE.DESIGNATION EVE_DESIGNATION
          ,EVE.ETAT EVE_ETAT
		  ,EVE.ID_EVALUATION EVE_ID_EVALUATION
          ,UE.DESIGNATION UE_DESIGNATION
          ,ENS.NOM ENS_NOM
		  ,ENS.NO_ENSEIGNANT ENS_NO_ENSEIGNANT
	      ,CGRC.RV_MEANING SIGNIFICATION
FROM ENSEIGNANT ENS
    ,EVALUATION EVE
    ,FORMATION FRM
    ,PROMOTION PRO
    ,UNITE_ENSEIGNEMENT UE
	,CG_REF_CODES CGRC
  WHERE EVE.NO_ENSEIGNANT=ENS.NO_ENSEIGNANT AND EVE.ANNEE_PRO=PRO.ANNEE_PRO AND PRO.CODE_FORMATION=FRM.CODE_FORMATION AND UE.CODE_UE = EVE.CODE_UE AND EVE.ETAT = CGRC.RV_LOW_VALUE
;


CREATE VIEW V_RUB_QUESTION
(R_QUE_NO_ENSEIGNANT
 ,R_QUE_ID_EVALUATION
 ,R_QUE_ID_RUBRIQUE
 ,R_QUE_ID_QUESTION
 ,R_QUE_ID_QUALIFICATIF
 ,R_MAXIMAL
 ,R_MINIMAL
 ,R_QUE_ORDRE
 ,R_QUE_INTITULE)
AS SELECT 	ENS.NO_ENSEIGNANT ENS_NO_ENSEIGNANT
			,EVE.ID_EVALUATION EVE_ID_EVALUATION
			, REV.ID_RUBRIQUE_EVALUATION REV_ID_RUBRIQUE_EVALUATION
			, QUE.ID_QUESTION QUE_ID_QUESTION
			, QUA.ID_QUALIFICATIF QUA_ID_QUALIFICATIF
			, QUA.ID_QUALIFICATIF QUA_MAXIMAL
			, QUA.ID_QUALIFICATIF QUA_MINIMAL
			, QEV.ORDRE QUE_ORDRE	
			, QUE.INTITULE QUE_INTITULE
FROM ENSEIGNANT ENS
	,EVALUATION EVE
	,RUBRIQUE_EVALUATION REV 	
	,QUESTION QUE
	,QUALIFICATIF QUA
	,QUESTION_EVALUATION QEV
	
WHERE ENS.NO_ENSEIGNANT = EVE.NO_ENSEIGNANT AND EVE.ID_EVALUATION = REV.ID_EVALUATION AND REV.ID_RUBRIQUE_EVALUATION = QEV.ID_RUBRIQUE_EVALUATION AND QEV.ID_QUESTION = QUE.ID_QUESTION AND QUE.ID_QUALIFICATIF = QUA.ID_QUALIFICATIF
;

ALTER VIEW V_RUBEVAL
(EVE_ID_EVALUATION
 ,ENS_NOM
 ,REV_ORDRE
 ,REV_DESIGNATION
 ,REV_ID_RUBRIQUE_EVALUATION)
AS SELECT EVE.ID_EVALUATION EVE_ID_EVALUATION
			, ENS.NOM ENS_NOM
			, REV.ORDRE REV_ORDRE
			, REV.DESIGNATION REV_DESIGNATION
			,REV.ID_RUBRIQUE_EVALUATION REV_ID_RUBRIQUE_EVALUATION
FROM EVALUATION EVE
	,RUBRIQUE_EVALUATION REV
	,ENSEIGNANT ENS
WHERE EVE.ID_EVALUATION = REV.ID_EVALUATION AND EVE.NO_ENSEIGNANT=ENS.NO_ENSEIGNANT
;

CREATE OR REPLACE VIEW V_QUESTION_EVALUATION
 (QUE_INTITULE
 ,QUA_MINIMAL
 ,QUA_MAXIMAL
 ,REV_ID_RUBRIQUE_EVALUATION
 )
 AS SELECT QUE.INTITULE QUE_INTITULE
          ,QUA.MINIMAL QUA_MINIMAL
          ,QUA.MAXIMAL QUA_MAXIMAL
		  ,REV.ID_RUBRIQUE_EVALUATION REV_ID_RUBRIQUE_EVALUATION
		  
FROM QUESTION QUE
	,QUESTION_EVALUATION QEV
    ,QUALIFICATIF QUA
	,RUBRIQUE_EVALUATION REV
  WHERE QUE.ID_QUALIFICATIF = QUA.ID_QUALIFICATIF AND REV.ID_RUBRIQUE_EVALUATION = QEV.ID_RUBRIQUE_EVALUATION 
;