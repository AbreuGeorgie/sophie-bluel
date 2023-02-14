//import des fonctions pour reccuperer et afficher les projets de l'architecte
import { callApiWorks, genererFigure } from "./work.js";

export function genererFiltres(){
    //appel à l'api pour reccupérer les filtres et création des filtres
    callApiWorks().then((figures) => {
        const filtres = new Set([]); //création d'une liste set de filtres

        figures.forEach((figure) => {
            filtres.add(figure.category.name);// pour chaque catégory.name créé un filtre
        });

        const conteneurFiltres = document.querySelector("#filtres"); //reccuperation du conteneur de filtres

        const boutonTout = document.createElement("button"); //reccuperation du bouton Tout
        boutonTout.innerText = "Tout";
        conteneurFiltres.appendChild(boutonTout); //relier le bouton Tout au conteneur de filtres

        //lors du clique sur le bouton tout => generer tous les projets
        boutonTout.addEventListener("click", () => {
            document.querySelector(".gallery").innerHTML = "";//suppression de l'affichage des projet-
            figures.forEach(genererFigure);//ajout de tous les projets
        });
        //affichage des projets en fonction des filtres
        filtres.forEach((filtre) => {
            const boutonFiltre = document.createElement("button");
    
            boutonFiltre.innerText = filtre;
    
            conteneurFiltres.appendChild(boutonFiltre);
    
            boutonFiltre.addEventListener("click", () => {
                const projetsFiltrees = figures.filter((figure) => {
                    return figure.category.name === filtre;//selectionne les projets correspondant a la categorie cliquée
                });
                document.querySelector(".gallery").innerHTML = "";//suppression de l'affichage des projets
                projetsFiltrees.forEach(genererFigure);//ajout des projets filtrés
            });
        });
    });

    //affichage des projets en fonction des filtres
    
};