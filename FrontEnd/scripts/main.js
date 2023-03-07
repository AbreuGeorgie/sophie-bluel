//import des fonctions pour reccuperer et afficher les projets de l'architecte
import { callApiWorks, genererFigure } from "./work.js";
import { genererFiltres } from "./filtres.js";
import { openModal } from "./modal.js";

//Affichage des éléments une fois la page chargée
window.addEventListener('DOMContentLoaded', (event) => {
    let token = window.sessionStorage.getItem("token")
    if (token !== null) {
        console.log(token, 'connecté')
        // si connecté alors:
        const boutonLogin = document.querySelector(".login-logout");
        boutonLogin.innerHTML = "logout";
        document.getElementById("mode-edition").style.display = "flex";
        document.getElementById("modifier").style.display = "block";
        document.getElementById("modifier-photo").style.display = "block";
    };

    callApiWorks().then((figures) => {
        figures.forEach((figure) => {
            genererFigure(figure); // pour chaque projet => generer projet
        });
        genererFiltres();
        
    });

    const boutonLogin = document.querySelector(".login-logout"); //reccuperation du bouton Login
    //deconnexion
    boutonLogin.addEventListener("click", function (e) {
        if (window.sessionStorage.getItem("token") != null) {
            e.preventDefault() // ne pas rediriger
            window.sessionStorage.removeItem("token"); //supprime le token
            boutonLogin.innerHTML = "login";
            document.getElementById("mode-edition").style.display = null;
            document.getElementById("modifier").style.display = null;
            document.getElementById("modifier-photo").style.display = null;
        }
    });

    //fonction qui va appeler a l'ouverture de la modale lors du clique sur le bouton modifier
    document.querySelector(".js-modal").addEventListener("click", (e) => {
        callApiWorks().then((figures) => {
            openModal(e, figures)
            console.log("az", e, "aa", figures)
        });
    });

});
