function genererFigureModal(work) {

    const projetArchitecte = document.createElement("figure");
    const gallerieModal = document.querySelector(".gallery-modal");

    //création des images et nom des projets
    const imageProjet = document.createElement("img");
    imageProjet.crossOrigin = "anonymous";
    imageProjet.src = work.imageUrl;
    imageProjet.alt = work.title;
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = "éditer";

    // on rattache les projets de l'architecte à la gallerie
    gallerieModal.appendChild(projetArchitecte);

    //ratachement des images et noms des projets aux projets de l'architecte
    projetArchitecte.appendChild(imageProjet);
    projetArchitecte.appendChild(nomProjet);
};


let modal = null;

//variable qui permet d'identifier les différents éléments focusables 
const focusableSelector = "button, a, input, textarea";
let focusables = []

//focntion qui va permettre d'ouvrir la fenetre modale
export const openModal = function (e, figures){
    figures.forEach((figure) => {
        genererFigureModal(figure); // pour chaque projet => generer projet
    });
    console.log("mes figures dans modal", figures)
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href")) // cible l'id modal1
    const boutonClose= document.querySelector(".js-close-modal")
    boutonClose.innerHTML = "x" //remplace par une croix
    focusables = Array.from(modal.querySelectorAll(focusableSelector)) //Array.from pour avoir les éléments focusables dans un tableau
    focusables[0].focus() //permet de selectionner le premier élément focusable avec tab
    modal.style.display = null // enlève de display none attribué dans le HTML
    modal.removeAttribute("aria-hidden")// on retire le masquage d'élément pour les lecteurs d'écran (accessibilité)
    modal.setAttribute("aria-modal", "true")//permet d'indiquer aux technologies d'assistance que les fenetre situées sous la boite de dialogue ne font pas partie de la boite modal (accessibilité)
    modal.addEventListener("click", closeModal)//permet de fermer la fenetre lors du click
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal)//permet de fermer la modal lors du clique sur le bouton
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)//permet de stopper la propagation de fermeture lors du clique a l'interieur de la modale
}

//fonction qui va permettre de fermer la fenetre modale
const closeModal = function(e) {
    if (modal === null) return  //si la modale s'affiche
    e.preventDefault(); 
    document.querySelector(".gallery-modal").innerHTML = "";
    modal.style.display = "none"; // ne plus afficher la modale
    modal.setAttribute("aria-hidden", "true"); //on masque la modale pour les lecteurs d'écran (accessibilité)
    modal.removeAttribute("aria-modal"); // on indique les fenetres sous la modale redevienne active (accessibilité)
    modal.removeEventListener("click", closeModal); // on retire l'écoute du clique 
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal); //on retire la fermeture de la modale
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation); // on retire le stop de propagation pour la fermeture
    retourPageAccueilModale();
    modal = null; // on remet la valeur de la modal a null

}

//fonction qui va permettre de selectionner les elements focusable
const focusInModal = function(e){
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true){
        index--
    } else {
        index++
    }
    if (index >= focusables.length){
        index = 0
    }
    if (index < 0){
        index = focusables.length -1
    }
    focusables[index].focus();

    console.log(index)
}

//focntion qui va permettre de stopper la propagation 
const stopPropagation = function(e){
    e.stopPropagation()
    console.log("stop propagation")
}

//fonction qui écoute les cliques du clavier et permet de fermer la modal ou selectionner un element focusable avec tab
window.addEventListener("keydown", function(e){
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null){
        focusInModal(e);
    }
})

//constante de la page modale ajouter projets
const boutonAjouterProjet = document.querySelector("#ajouter-projets");
const boutonRetour = document.querySelector(".fleche-retour");
const boutonSupprimerProjet = document.getElementById("supprimer-projets");
const boutonValider = document.getElementById("valider");
const ajoutProjet = document.getElementById("ajout-projets");
const titreModal = document.querySelector("#titre-modal");

const ajouterDesProjets = function ajouterDesProjets(){
    titreModal.innerText = "Ajout photo";

    document.querySelector(".gallery-modal").style.display = "none";
    ajoutProjet.style.display = "block";
    boutonRetour.style.display = "block";
    document.getElementById("ajouter-projets").style.display = "none";
    boutonSupprimerProjet.style.display = "none";
    boutonValider.style.display = "block";
};

const retourPageAccueilModale = function retourPageAccueilModale(){
    titreModal.innerText = "Galerie photo";

    document.querySelector(".gallery-modal").style.display = "flex";
    ajoutProjet.style.display = "none";
    boutonRetour.style.display = "none";
    document.getElementById("ajouter-projets").style.display = "block";
    boutonSupprimerProjet.style.display = "block";
    boutonValider.style.display = "none";
};

boutonAjouterProjet.addEventListener("click", ajouterDesProjets);

boutonRetour.addEventListener("click", retourPageAccueilModale);
