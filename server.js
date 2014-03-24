// Chargement de modules utilis�s. 
var express = require('express')
  , path = require('path')
  , app = express()
  , mysql      = require('mysql')
  , accueil = require('./routes/accueil')  // routes par defaut
  , eval = require('./routes/eval')
  , evalDao = require('./dao/evalDao'); // eval
 
// les vues seront plac�es dans le r�pertoire views
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
// defini le r�pertoire contenant le contenu statique
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

var listeEvaluations;
var listeRubriqueEvaluations;
var NumEns;
var nbEnregistrementEval = {};
var promotion1,promotion2,formation1,formation2,designation1,designation2,ue1,ue2,etat1,etat2,periode1,periode2;
var ordreRubrique1,ordreRubrique2,ordreRubrique3,designationRubrique1,designationRubrique2,designationRubrique3;
//var ENS_NOM = "'Saliou'";
var requetteListeEvaluations = 'SELECT DISTINCT * from v_evaluation where ENS_NOM =+ENS_NOM';
//var countEvaluationEnseignant = 'SELECT count(*) as nb from v_evaluation where ENS_NOM ='+ENS_NOM;
var requetteRubrique = "'SELECT * from v_rubeval where ENS_NOM ='Saliou'";
var listeFormation = [];
var listePromotion = [];


connection.query('CREATE DATABASE IF NOT EXISTS evaespi', function (err) {
    if (err) throw err;
    connection.query('USE evaespi', function (err) {
        if (err) throw err;
        
		});

app.get('/handlebars', eval.testerHandlebars);
app.get('/eval/edit/:titre', eval.NouvelleEvaluationParams);
app.get('/listeRubriques/:idEval',function(req, res) {

var id = req.params.idEval;
console.log(id);
connection.query("SELECT DISTINCT * from v_rubeval where EVE_ID_EVALUATION ="+id, function(err, rows){
		
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			  console.log(rows);
			  listeRubriqueEvaluations = rows;
		      console.log(listeRubriqueEvaluations);
				var data1 = {
				       listeEvaluations: listeEvaluations,
					   listeRubriques: rows
				}
				res.render('index-2.hbs',data1);
			}
				
		});	

});

app.get('/listeQuestions/:idRubrique',function(req, res) {

var id = req.params.idRubrique;
console.log(id);
connection.query("SELECT DISTINCT * from v_question_evaluation where REV_ID_RUBRIQUE_EVALUATION ="+id, function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			  
				var data1 = {
				       listeEvaluations: listeEvaluations,
					   listeRubriques: listeRubriqueEvaluations,
					   listeQuestions: rows
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
	connection.query("Select DISTINCT ANNEE_PRO from Promotion", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			 listePromotion = rows;
			 
			}
		});	
		    var promotions = req.params.ANNEE_PRO;
		    console.log(promotions);
			connection.query("Select DISTINCT CODE_FORMATION from FORMATION where N0_ANNEE='"+promotions+"'", function(err, rows){
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


app.post('/rubriqueajoute', function (req, res) {
    
	var ordre=req.body.ordre;
	var designation = req.body.designation;
	var id = req.body.id_rub;
	
	if(id ==""){
	var con=connection.query("INSERT INTO rubrique(ORDRE, DESIGNATION) values(?,?);" , [ordre,designation],
        function (err, result) {
            if (err) throw err;
		console.log(con);	
		console.log(result.insertId);
           
		  	connection.query("SELECT * from rubrique ", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			var data1 = {
			listeRubrique: rows
				}
				res.render('creerRubrique.hbs',data1);
			}
		});	
			
        }
    );
	}
	
	else {
	
	var con=connection.query("UPDATE rubrique SET ORDRE=?, DESIGNATION=? WHERE ID_RUBRIQUE='"+id+"'" , [ordre,designation],
        function (err, result) {
            if (err) throw err;
		console.log(con);	
		console.log(result.insertId);
           
		  	connection.query("SELECT * from rubrique ", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			var data1 = {
			listeRubrique: rows
				}
				res.render('creerRubrique.hbs',data1);
			}
		});	
			
        }
    );
	
	}
	
});











app.post('/evalajoute', function (req, res) {
    
	var formation = req.body.formation;
	var promotion = req.body.promotion;
	var ue = req.body.ue;
	var designation = req.body.designation;
	var periode = req.body.periode;
	var etat = req.body.choice;
	
	console.log(formation+promotion+ue+designation+etat);
	var con=connection.query("INSERT INTO evaluation  (NO_ENSEIGNANT,CODE_FORMATION, ANNEE_PRO, CODE_UE, DESIGNATION, PERIODE, ETAT) values(?,?,?,?,?,?,?);" , [NumEns,formation,promotion,ue,designation,periode,etat],
        function (err, result) {
            if (err) throw err;
		console.log(con);	
		console.log(result.insertId);
           
		   connection.query("SELECT * from v_evaluation where ENS_NO_ENSEIGNANT ='"+NumEns+"'", function(err, rows){
        // There was a error or not?
		console.log(NumEns);
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
 * Cette fonction r�cup�re la liste des �valuations et alimente un template handlebars
 */
app.post('/listeEval', function (req, res){
//var NOEnseignant = req.params.select01;
NumEns = req.body.select01;

//console.log(requetteListeEvaluations+NumEns);		
	connection.query("SELECT * from v_evaluation where ENS_NO_ENSEIGNANT ='"+NumEns+"'", function(err, rows){
	listeEvaluations = rows;
	
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


/**
 * Cette fonction r�cup�re la liste des questions et alimente une template handlebars
 */
app.get('/ajouterQuestion', function (req, res){

			
	connection.query("select * from v_question_s", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			   
				var data = {
					   listeQuestions: rows
				}
				res.render('ajouter-question.hbs',data);
			}
				
		});		
			
	});

/**
 * Cette fonction r�cup�re la liste des rubriques et alimente une template handlebars
 */
app.get('/ajouterRubrique', function (req, res){

			
	connection.query("select * from Rubrique", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			   
				var data = {
					   listeRubriques: rows
				}
				res.render('ajouter-rubrique.hbs',data);
			}
				
		});		
			
	});

app.get('/creerRubrique', function (req,res){



	
	connection.query("SELECT * from rubrique ", function(err, rows){
        // There was a error or not?
			if(err != null) {
				res.end("Query error:" + err);
			} else {
			var data1 = {
			listeRubrique: rows
				}
				res.render('creerRubrique.hbs',data1);
			}
		});	
});

app.get('/creerQuestion', function (req,res){
res.render('creerQuestion.hbs');
});



app.listen(9090);
console.log('Server running at http://127.0.0.1:9090/');

});
