//import des fonctions pour reccuperer et afficher les projets de l'architecte
import { callApiWorks, genererFigure } from "./work.js";
import { genererFiltres } from "./filtres.js";
import { openModal } from "./modal.js";
import { logout } from "./logout.js";

//Affichage des éléments une fois la page chargée
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

    callApiWorks().then(function (figures) {
        figures.forEach(function (figure) {
            // pour chaque projet => generer projet
            genererFigure(figure);
        });
        // generer les filtres
        genererFiltres();  
    });

    //deconnection
    logout();

    //fonction qui va appeler a l'ouverture de la modale lors du clique sur le bouton modifier
    document.querySelector(".js-modal").addEventListener("click", (e) => {
        callApiWorks().then((figures) => {
            openModal(e, figures)
            console.log("az", e, "aa", figures)
        });
    });

});

