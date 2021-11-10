# HOT TAKES

## P6 - Création d’une API sécurisée pour une application d’avis gastronomiques

Contexte du projet :

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

Pour plus d'informations : https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf

## Installation

### Frontend

Le repository contenant le frontend se trouve ici : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Les dépendances suivantes sont requises pour faire tourner le frontend :

- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : assurez-vous d'utiliser la version de sass correspondant à votre version de NodeJS. Pour Node 14.0 par exemple, il vous faut la version 4.14+ de node-sass.

Clonez le repository et lancez `npm install`, et `npm install --save-dev run-script-os` dans le terminal depuis le dossier que vous venez de cloner (frontend).

Lancez `npm start` : le serveur local et votre navigateur doivent se lancer.
Utiliser `Ctrl+C` dans le terminal pour arrêter le serveur local.

### Backend

Les dépendances suivantes sont utilisées pour faire tourner le backend :

- bcrypt: "^5.0.1",
- body-parser: "^1.19.0",
- dotenv: "^10.0.0",
- express: "^4.17.1",
- jsonwebtoken: "^8.5.1",
- mongoose: "^6.0.12",
- mongoose-unique-validator: "^3.0.0",
- multer: "^1.4.3".

Clonez ce repository et lancez `npm install` dans le terminal depuis le dossier que vous venez de cloner (backend).

Il conviendra d'ajouter un fichier '.env' comportant les variables environnementales requises à la racine du dossier backend, ainsi qu'un dossier 'images'.
(Ces éléments sont déjà présent dans le dossier .zip transmis pour l'évaluation).

Lancez `node server` ou `nodemon server`. La console doit vous indiquer 'Listening on port 3000' et 'Connexion à MongoDB réussie'.
Utiliser `Ctrl+C` dans le terminal pour arrêter le serveur.
