//import des fonctions pour reccuperer et afficher les projets de l'architecte
import { callApiWorks, genererFigure } from "./work.js";

export const genererFiltres = function () {
    //appel à l'api pour reccupérer les filtres et création des filtres
    callApiWorks().then(function (figures) {
        //création d'une liste set de filtres
        const filtres = new Set([]);

        figures.forEach(function (figure) {
            // pour chaque catégory.name créé un filtre
            filtres.add(figure.category.name);
        });

        //reccuperation du conteneur de filtres
        const conteneurFiltres = document.querySelector("#filtres");

        //création du bouton Tout
        const boutonTout = document.createElement("button");
        boutonTout.innerText = "Tout";
        //rattacher le bouton Tout au conteneur de filtres
        conteneurFiltres.appendChild(boutonTout);

        //lors du clique sur le bouton Tout => generer tous les projets
        boutonTout.addEventListener("click", function () {
            //suppression de l'affichage de tous les projets
            document.querySelector(".gallery").innerHTML = "";
            //ajout de tous les projets
            figures.forEach(genererFigure);
        });

        //affichage des projets en fonction des filtres
        filtres.forEach(function (filtre) {
            //pour chaque filtre, création d'un bouton 
            const boutonFiltre = document.createElement("button");
            boutonFiltre.innerText = filtre;
            //rattacher chaque bouton filtre au conteneur de filtres
            conteneurFiltres.appendChild(boutonFiltre);

            boutonFiltre.addEventListener("click", function () {
                const projetsFiltrees = figures.filter((figure) => {
                    //selectionne les projets correspondant a la categorie cliquée
                    return figure.category.name === filtre;
                });
                //suppression de l'affichage de tous les projets
                document.querySelector(".gallery").innerHTML = "";
                //affichage des projets en fonction du filtre cliqué
                projetsFiltrees.forEach(genererFigure);
            });
        });
    });
};