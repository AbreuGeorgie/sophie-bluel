# CREER UNE PAGE WEB DYNAMIQUE AVEC JAVASCRIPT 

## Introduction

Ce repo contient le code frontend du site de l'architecte Sophie Bluel. 

## Lancement du frontend

Après avoir récupéré le REPO, suivre le README du backend.

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

- Les différents langages utilisés :

    - HTML5
    - CSS3
    - JAVASCRIPT

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

- [x] connexion avec le mauvais identifiant ou mot de passe
- [x] connexion avec le bon identifiant et mot de passe
- [x] ajouter un projet
- [x] supprimer un projet 
