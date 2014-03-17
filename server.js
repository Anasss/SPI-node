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
var nbEnregistrementEval = {};
var promotion1,promotion2,formation1,formation2,designation1,designation2,ue1,ue2,etat1,etat2,periode1,periode2;
var listePromotion = [];


//<td class ="center"><i class="icon-search"/></td>
//<td {{ab}}><{{ac}}/></td>
 
connection.query('CREATE DATABASE IF NOT EXISTS evaespi', function (err) {
    if (err) throw err;
    connection.query('USE evaespi', function (err) {
        if (err) throw err;
        
			
			
    connection.query("SELECT * from ENSEIGNANT", function(err, rows){
        // There was a error or not?
        if(err != null) {
            res.end("Query error:" + err);
        } else {
		
            // Shows the result on console window
            console.log(rows[0].NOM+' '+rows[0].PRENOM);
			console.log(rows[1].NOM);
			console.log(rows[2].NOM);
			console.log(rows[3].NOM);
			
        Enseignant1= rows[0].PRENOM+' '+rows[0].NOM;
		Enseignant2= rows[1].PRENOM+' '+rows[1].NOM;
		Enseignant3= rows[2].PRENOM+' '+rows[2].NOM;
		Enseignant4= rows[3].PRENOM+' '+rows[3].NOM;
		
		
        }
		
		
    });
	connection.query("SELECT count(*) as nb from v_evaluation where ENS_NOM ='Saliou'", function(err, rows){
        // There was a error or not?
        if(err != null) {
            res.end("Query error:" + err);
        } else {
		   nbEnregistrementEval = rows[0].nb;
           console.log(nbEnregistrementEval);
		   //console.log(a);
		   //console.log(ac);
         }
		
		
    });
	    connection.query("SELECT * from v_evaluation where ENS_NOM = 'Saliou'", function(err, rows){
        // There was a error or not?
        if(err != null) {
            res.end("Query error:" + err);
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
			//promotion2 = rows[1].EVE_ANNEE_PRO;
			formation1 = rows[0].FRM_CODE_FORMATION;
			//formation2 = rows[1].FRM_CODE_FORMATION;
			designation1 = rows[0].EVE_DESIGNATION;
			//designation2 = rows[1].EVE_DESIGNATION;
			ue1 = rows[0].UE_DESIGNATION;
			//ue2= rows[1].UE_DESIGNATION;
			etat1 = rows[0].EVE_ETAT;
			//etat2 = rows[1].EVE_ETAT;
			periode1 = rows[0].EVE_PERIODE;
			//periode2 = rows[1].EVE_PERIODE;
		}
		
        }
			
    });
});

// Database setup



app.get('/handlebars', eval.testerHandlebars);
app.get('/eval/edit/:titre', eval.NouvelleEvaluationParams);
app.post('/eval/editEvaluation/', eval.NouvelleEvaluationData);
app.get('/eval/liste', evalDao.listeEvaluation);
app.get('/index', accueil.index);


app.get('/', function(req, res) {

var data = {
        Enseignant1: Enseignant1,
		Enseignant2: Enseignant2,
		Enseignant3: Enseignant3,
		Enseignant4: Enseignant4
        
		//type: rubriques[0].type;
		//designation:
    }


    res.render('login.hbs',data);
	
	
});



app.get('/eval/listeRubrique/', eval.listeRubrique);
app.get('/eval/listeRubriqueEvaluation/', eval.listeRubriqueEvaluation);
//app.post('/eval/editRubrique/', eval.NouvelleRubrique);
app.get('/eval/injecterEvaluation', eval.InjecterNouvelleEvaluation);
app.get('/ajouterEval', eval.ajouterEval);
app.get('/listeEval', function (req, res){
console.log(req.params.nom);
if (nbEnregistrementEval == 1) {
		
	   var hidden = "hidden";
		}
		
var data1 = {
       // Enseignant1: Enseignant1,
	   
		    promotion1: promotion1,
			promotion2: promotion2,
			formation1: formation1,
			formation2: formation2,
			designation1: designation1,
			designation2: designation2,
			ue1: ue1,
			ue2: ue2,
			etat1: etat1,
			etat2: etat2,
			periode1: periode1,
			periode2: periode2,
            hidden: hidden
			
			//b: b;
			//c: c;
		
    }

    res.render('index-2.hbs',data1);
});




app.listen(9090);
console.log('Server running at http://127.0.0.1:9090/');

});
