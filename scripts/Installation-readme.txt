1. Ajouter la variable d'environnement suivante dans Path :   C:\wamp\bin\mysql\mysql5.6.12\bin

2. Editer le fichier generate.bat avec Notepad++ 

FOR %%X IN (*.sql) DO mysql -h localhost -u root NomDevotreBDD < %%X

3. Ouvrerez le cmd et executez les commandes suivantes : 

cd r�pertoire contenant le dossier "scripts"

generate.bat



hooooooo hooooooooooooo

Regardez votre Base de Donn�es Maintenant 