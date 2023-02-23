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
    }

    //fonction qui va permettre de publier les changements dans la modale
    const boutonPublier = document.getElementById("publier-changements");
    boutonPublier.addEventListener("click", function () {
        /*...*/
    });

    callApiWorks().then((figures) => {
        figures.forEach((figure) => {
            genererFigure(figure); // pour chaque projet => generer projet
        });
        genererFiltres();
        //fonction qui va appeler a l'ouverture de la modale lors du clique sur le bouton 
        document.querySelectorAll(".js-modal").forEach(a => {
            a.addEventListener("click", (e) => {
                openModal(e, figures)
            })
        })

    });
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
        
    }
});


