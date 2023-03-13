//import des fonctions pour reccuperer et afficher les projets de l'architecte
import { callApiWorks, genererFigure } from "./work.js";
import { genererFiltres } from "./filtres.js";
import { openModal } from "./modal.js";
import { logout } from "./logout.js";

/* -------------AFFICHAGE DES ELEMENTS UNE FOIS LA PAGE CHARGEE ----------------- */

window.addEventListener('DOMContentLoaded', function (event) {
    let token = window.sessionStorage.getItem("token")

    // si connecté alors:
    if (token !== null) {
        //modification du bouton login en logout
        const boutonLogin = document.querySelector(".login-logout");
        boutonLogin.innerHTML = "logout";
        //mode edition affiché
        document.getElementById("mode-edition").style.display = "flex";
        //bouton modifié affiché
        document.getElementById("modifier").style.display = "block";
        //bouton modifié (sous photo) affiché
        document.getElementById("modifier-photo").style.display = "block";
    };

    //appel a l'api
    callApiWorks().then(function (figures) {
        figures.forEach(function (figure) {
            // pour chaque projet generer projet
            genererFigure(figure);
        });
        // generer les filtres
        genererFiltres();
    });

    //deconnexion
    logout();

    //fonction ouverture de la modale lors du click sur le bouton modifier
    document.querySelector(".js-modal").addEventListener("click", function (e) {
        callApiWorks().then(function (figures) {
            openModal(e, figures)
        });
    });
});

