// Chargement de modules utilisés. 
var express = require('express')
  , path = require('path')
  , app = express()
  , mysql      = require('mysql')
  , accueil = require('./routes/accueil')  // routes par defaut
  , eval = require('./routes/eval')
  , evalDao = require('./dao/evalDao'); // eval
 
// les vues seront placées dans le répertoire views
app.set('views', __dirname + '/views');
 // utilisation du moteur de templates "handelbars"
app.set('view engine', 'hbs');
// affichage des logs pour developpement
app.use(express.logger('dev'));
// analyse le contenu des requetes et fournit req.body
app.use(express.bodyParser());
//  permet l'utilisation de app.put et app.delete
app.use(express.methodOverride());
// utilisation du router pour diriger les requetes
app.use(app.router);
// defini le répertoire contenant le contenu statique
app.use(express.static(path.join(__dirname, 'public')));
  
app.configure(function(){
    //To use .html as file extension for templates uncomment these 2 lines
    //as well as switch the filetype of index.hbs below
    //app.set('view engine', 'html');
    //app.engine('html', require('hbs').__express); - 
});



var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });
 
var Enseignant1 ={};
var Enseignant2 ={};
var Enseignant3 ={};
var NOM;
var nbEnregistrementEval = {};
var promotion1,promotion2,formation1,formation2,designation1,designation2,ue1,ue2,etat1,etat2,periode1,periode2;
var ordreRubrique1,ordreRubrique2,ordreRubrique3,designationRubrique1,designationRubrique2,designationRubrique3;
//var ENS_NOM = "'Saliou'";
var requetteListeEvaluations = 'SELECT * from v_evaluation where ENS_NOM =';
//var countEvaluationEnseignant = 'SELECT count(*) as nb from v_evaluation where ENS_NOM ='+ENS_NOM;
var requetteRubrique = "'SELECT * from v_rubeval where ENS_NOM ='Saliou'";
var listeFormation = [];
var listePromotion = [];


connection.query('CREATE DATABASE IF NOT EXISTS evaespi', function (err) {
    if (err) throw err;
    connection.query('USE evaespi', function (err) {
        if (err) throw err;
        
			
			
    /*connection.query("SELECT * from ENSEIGNANT", function(err, rows){
        // There was a error or not?
        if(err != null) {
           console.log("Query error:" + err);
        } else {
		
       	var data1 = {
					   listeEnseignants: rows
				}
				res.render('login.hbs',data1);
		
        /*Enseignant1= rows[0].PRENOM+' '+rows[0].NOM;
		Enseignant2= rows[1].PRENOM+' '+rows[1].NOM;
		Enseignant3= rows[2].PRENOM+' '+rows[2].NOM;
		Enseignant4= rows[3].PRENOM+' '+rows[3].NOM;
		
		
        }
		
		
    });*/
	
	/*connection.query(countEvaluationEnseignant, function(err, rows){
        // There was a error or not?
        if(err != null) {
            console.log("Query error:" + err);
        } else {
		   nbEnregistrementEval = rows[0].nb;
         
		   
         }
		
		
<<<<<<< HEAD
    });
	    connection.query(requetteListeEnseignant, function(err, rows){
        // There was a error or not?
        if(err != null) {
            console.log("Query error:" + err);
        } else {
		
		
		
       if (nbEnregistrementEval == 2 ){ 
            promotion1 = rows[0].EVE_ANNEE_PRO;
			promotion2 = rows[1].EVE_ANNEE_PRO;
			formation1 = rows[0].FRM_CODE_FORMATION;
			formation2 = rows[1].FRM_CODE_FORMATION;
			designation1 = rows[0].EVE_DESIGNATION;
			designation2 = rows[1].EVE_DESIGNATION;
			ue1 = rows[0].UE_DESIGNATION;
			ue2= rows[1].UE_DESIGNATION;
			etat1 = rows[0].EVE_ETAT;
			etat2 = rows[1].EVE_ETAT;
			periode1 = rows[0].EVE_PERIODE;
			periode2 = rows[1].EVE_PERIODE;
			}
			
			else {
			
            promotion1 = rows[0].EVE_ANNEE_PRO;
			
			formation1 = rows[0].FRM_CODE_FORMATION;
			designation1 = rows[0].EVE_DESIGNATION;
			ue1 = rows[0].UE_DESIGNATION;
			etat1 = rows[0].EVE_ETAT;
			periode1 = rows[0].EVE_PERIODE;
			
		}
		
        }
			
    });
	 connection.query(requetteRubrique, function(err, rows){
=======
    });*/
	    
	 /*connection.query(requetteRubrique, function(err, rows){
>>>>>>> f14c70b1459000cb294158ac7cb4026b7d31cebf
        // There was a error or not?
        if(err != null) {
            console.log("Query error:" + err);
        } else {
		ordreRubrique1= rows[0].REV_ORDRE;
		ordreRubrique2= rows[1].REV_ORDRE;
		//ordreRubrique3= rows[2].REV_ORDRE;
		designationRubrique1= rows[0].REV_DESIGNATION;
		designationRubrique2= rows[1].REV_DESIGNATION;
		//designationRubrique3= rows[2].REV_DESIGNATION;
		
		
		
        }
		
		
    });*/
});

app.get('/handlebars', eval.testerHandlebars);
app.get('/eval/edit/:titre', eval.NouvelleEvaluationParams);


app.get('/listeRubriques/:idEval',function(req, res) {

var id = req.params.idEval;
console.log(id);
connection.query("SELECT * from v_rubeval where EVE_ID_EVALUATION ="+id, function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			  
				var data1 = {
					   listeRubrique: rows
				}
				res.render('index-2.hbs',data1);
			}
				
		});	

});

app.get('/',function(req, res) {
	connection.query("SELECT * from ENSEIGNANT", function(err, rows){
	
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			  
				var data = {
					   a: rows[0].NOM,
					   listeEnseignants: rows
				}
				res.render('login.hbs',data);
			}
				
		});	
});



app.post('/eval/editEvaluation/', eval.NouvelleEvaluationData);
app.get('/eval/liste', evalDao.listeEvaluation);
app.get('/index', accueil.index);
app.get('/eval/listeRubrique/', eval.listeRubrique);
app.get('/eval/listeRubriqueEvaluation/', eval.listeRubriqueEvaluation);
//app.post('/eval/editRubrique/', eval.NouvelleRubrique);
app.get('/eval/injecterEvaluation', eval.InjecterNouvelleEvaluation);
app.get('/ajouterEval', function(req, res){
	connection.query("Select ANNEE_PRO from Promotion", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			 listePromotion = rows;
			 
			}
		});	
			connection.query("Select DISTINCT CODE_FORMATION from UNITE_ENSEIGNEMENT", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			listeFormation = rows;				
			}
		});	
		    connection.query("Select CODE_UE from UNITE_ENSEIGNEMENT", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			 var data = {
			    listePromotions: listePromotion,
			    listeFormations: listeFormation,
				uniteEnseignements: rows
						}
				console.log("ok");
				res.render('ajouter-evaluation.hbs',data);
			}
		});	
});





app.post('/evalajoute', function (req, res) {
    
	var formation = req.body.formation;
	var promotion = req.body.promotion;
	var ue = req.body.ue;
	var designation = req.body.designation;
	var periode = req.body.periode;
	var etat = req.body.choice;
	
	console.log(formation+promotion+ue+designation+etat);
	var con=connection.query("INSERT INTO evaluation  (CODE_FORMATION, ANNEE_PRO, CODE_UE, DESIGNATION, PERIODE, ETAT) values(?,?,?,?,?,?);" , [formation,promotion,ue,designation,periode,etat],
        function (err, result) {
            if (err) throw err;
		console.log(con);	
		console.log(result.insertId);
           
		   connection.query("SELECT * from v_evaluation where ENS_NOM ='"+NOM+"'", function(err, rows){
        // There was a error or not?
		console.log(NOM);
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			var data1 = {
			listeEvaluations: rows
				}
				res.render('index-2.hbs',data1);
			}
		});	
			
        }
    );
	
});
/**
 * Cette fonction récupère la liste des évaluations et alimente un template handlebars
 */
app.post('/listeEval', function (req, res){
//var NOEnseignant = req.params.select01;
var NOM = req.body.select01;

console.log(requetteListeEvaluations+NOM);		
	connection.query("SELECT * from v_evaluation where ENS_NOM ='"+NOM+"'", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			var data1 = {
			listeEvaluations: rows
				}
				res.render('index-2.hbs',data1);
			}
		});	
});

app.get('/creerRubrique', function (req,res){
res.render('creerRubrique.hbs');
});

app.get('/creerQuestion', function (req,res){
res.render('creerQuestion.hbs');
});

app.get('/ajouterQuestion', function (req,res){
res.render('ajouter-question.hbs');
});
app.get('/ajouterRubrique', function (req,res){
res.render('ajouter-rubrique.hbs');
});


app.listen(9090);
console.log('Server running at http://127.0.0.1:9090/');

});
