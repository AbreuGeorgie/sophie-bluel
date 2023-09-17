![Banner](/FrontEnd/assets/images/readme/sophie-bluel.webp)

## Technologies

- HTML
- CSS
- Javascript

## Description

[Projet 3](https://openclassrooms.com/fr/paths/717/projects/1157/assignment) réalisé dans le cadre du programme de formation Développeur Web chez OpenClassrooms.

> Créer une page web dynamique avec JavaScript

### Contexte

Je suis développeuse front-end pour l’agence ArchiWebos qui comprend 50 salariés. 

Ayant terminé mon dernier projet avec un peu d'avance, je suis envoyée en renfort d’une équipe qui travaille sur la conception du site portfolio d’une architecte d’intérieur.

Je dois donc développer :
- la page de présentation des travaux de l'architecte (à partir du HTML fourni) ;
- la page de connexion de l'administrateur du site (le client) (code à créer de zéro) ;
- la modale permettant d'uploader de nouveaux médias (code à créer from scratch).

> ### Compétences évaluées :
>
> - Manipuler les éléments du DOM avec JavaScript
> - Récupérer les données utilisateurs dans le JavaScript via des formulaires
> - Gérer les événements utilisateurs avec JavaScript

## Lancement du backend

Après avoir récupéré le REPO executez la commande `npm install` pour installer les dépendances du projet

Une fois les dépendances installées lancez le projet avec la commande `npm start`

Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie 
```

## Lancement du frontend

Telecharger l'extension Live Server sur Visual Studio Code.

Le dossier caché .vscode contient la configuration du projet pour live server, si vous utilisez vos configurations personnalisées, veillez à utiliser ce paramètre :
```json
{
    "liveServer.settings.port": 5501,
    "liveServer.settings.root": "/FrontEnd"
}
```

Lancer le fichier index.html avec Live Server.

## Détail des fichiers

- Fichiers HTML:

    Le projet contient 2 fichiers HTML.
    Le fichier index.html qui contient le code HTML de la page d'accueil du site et le fichier login.html où j'y ai mis le code HTML de la page de connexion.

- Fichier CSS:

    Il y a 1 fichier CSS style.css qui contient tout le CSS du projet.

- Fichiers JAVASCRIPT:

    Il y a 6 fichiers Javascript:

    - 1 fichier principal main.js appelé directement par le fichier index.html, dans lequel j'y ai importé les fonctions qui concerne la page d'accueil.

    -   Le fichier work.js qui contient l'appel à l'api pour récupérer les works du backend et la fonction pour les générer sur la page, ses fonctions sont appelées dans tous les fichiers ratachés à la page d'accueil (tous sauf login.js).

    - Le fichier filtres.js qui contient la fonction pour mettre en place les filtres.

    - Le fichier modale.js qui contient les fonctions qui concerne la modale.

    - Le fichier login.js est indépendant des autres et est appelé par le fichier login.html.

    - Le fichier logout.js qui contient la fonction de deconnexion appelée par le main.js.

## Sources

Pour ce projet, je me suis aidée : 
* des cours sur Javascript d'OpenClassRoom
* du webinaire "Utilisez JavaScript pour réaliser un site dynamique" d'OpenClassRoom
* du guide des étapes clés
* du tutoriel "Documenter son API avec OpenAPI (Swagger)" de Grafikart
* du tutoriel "Fenêtre modale" de Grafikart également
* du site https://developer.mozilla.org notamment les pages pages qui concernent fetch, createElement, l'objet Set, l'objet formData
* du site https://fr.javascript.info, à la page qui explique comment utiliser la requête POST avec fetch

## Tests fonctionnels

- [x] connexion avec le mauvais identifiant ou mot de passe pour voir le message d'erreur
- [x] connexion avec le bon identifiant et mot de passe pour voir si la connexion se passe bien
- [x] cliquer sur les filtres pour voir le bon affichage des projets
- [x] cliquer sur modifier pour ouvrir la modale
- [x] ajouter un projet et voir si l'ajout se fait bien sur la modale et dans la page d'accueil
- [x] supprimer un projet et voir si la suppression se fait bien sur la modale et dans la page d'accueil
- [x] se deconnecter pour voir si cela fonctionne

## Auteur :

**Georgie Abreu** : [**GitHub**](https://github.com/AbreuGeorgie/)

