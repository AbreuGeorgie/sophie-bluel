import { genererFigure } from "./work.js";

let modal = null;
//création d'un tableau pour y mettre les figures
let globalFigures = [];

//---------------------------------- FOCUSABLE -------------------------//

//variable qui permet d'identifier les différents éléments focusables 
const focusableSelector = "button, a, input, textarea";
let focusables = []

//fonction qui va permettre de selectionner les elements focusable
const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus();
}

//fonction qui écoute les cliques du clavier et permet de fermer la modal ou selectionner un element focusable avec tab
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})

//---------------------------------------------------------------------------------//

const creePoubelle = function () {
    //création du logo poubelle dans le boutton
    const boutonPoubelle = document.createElement("button");
    const logoPoubelle = document.createElement("i");
    boutonPoubelle.className = "bouton-poubelle";
    logoPoubelle.className = "fa-solid fa-trash-can";

    //on rattache le logo au bouton poubelle
    boutonPoubelle.appendChild(logoPoubelle);
    return boutonPoubelle;
}

const creeBoutonDeplacer = function (){
    //création du bouton déplacer
    const boutonDeplacer = document.createElement("button");
    const logoDeplacer = document.createElement("i");
    boutonDeplacer.className = "bouton-deplacer";
    logoDeplacer.className = "fa-solid fa-arrows-up-down-left-right";
    boutonDeplacer.appendChild(logoDeplacer);
    return boutonDeplacer;
}

const callBackSupprimer = function (work) {
    return function (e) {
        //sélection de l'élément parent du bouton poubelle
        const boutonParentLogoPoubelle = e.target.parentElement;
        //si workId dans le boutonParentLogoPoubelle existe :
        if ("workId" in boutonParentLogoPoubelle.dataset === true) {
            //id = workId du boutonParentLogoPoubelle
            const id = boutonParentLogoPoubelle.dataset.workId;
            //reccupération du token stocké dans le sessionsStorage
            let token = window.sessionStorage.getItem("token");
            //suppression de la figure via l'api
            fetch('http://localhost:5678/api/works/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                //suppression dynamique dans la page d'accueil (affichage dynamique des figures grâce à globalFigures)
                .then(function (res) {
                    //filtre pour supprimer dynaquement dans la page d'accueil 
                    const workSupprime = globalFigures.filter(function (work, index, tab) {
                        //si id du tableau globalFigure == id ciblé lors du clique (sur le boutonParentLogoPoubelle) alors:
                        if (work.id == id) {
                            //suppression dans le tableau de la figure ciblé
                            tab.splice(index, 1);
                            return true;
                        }
                        //id n'existe plus dans le tableau
                        return false;
                    })
                })
        }
        //suppression de la figure ciblé dans la modale (dynamiquement)
        gallerieModal.removeChild(boutonParentLogoPoubelle.parentElement);
    }
}

const genererFigureModal = function (work) {

    //création de figure et import de la gallerie modale
    const projetArchitecte = document.createElement("figure");
    const gallerieModal = document.querySelector(".gallery-modal");

    //création des images et nom des figures
    const imageProjet = document.createElement("img");
    imageProjet.crossOrigin = "anonymous";
    imageProjet.src = work.imageUrl;
    imageProjet.alt = work.title;
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = "éditer";

    //affichage de la poubelle sur les figures de la modale 
    const boutonPoubelle = creePoubelle();

    //affichage du bouton déplacer sur les figures
    const boutonDeplacerProjet = creeBoutonDeplacer();

    //association de l'id de bouton poubelle à l'id de la figure
    boutonPoubelle.dataset.workId = work.id;

    // on rattache les projets de l'architecte à la gallerie
    gallerieModal.appendChild(projetArchitecte);

    //ratachement des images et noms des projets aux projets de l'architecte
    projetArchitecte.appendChild(imageProjet);
    projetArchitecte.appendChild(nomProjet);
    projetArchitecte.appendChild(boutonPoubelle);
    projetArchitecte.appendChild(boutonDeplacerProjet);

    //supprimer des éléments de la gallerie et gallerie modale
    boutonPoubelle.addEventListener("click", callBackSupprimer(work))
    projetArchitecte.addEventListener("mouseover", function (event) {
        // on affiche le logo fleche deplacer
        boutonDeplacerProjet.style.display = "block";
    })
    projetArchitecte.addEventListener("mouseout", function (event) {
        // on enleve l'affichage le logo fleche deplacer
        boutonDeplacerProjet.style.display = "none";
    })
};

//--------------------- OUVERTURE MODALE ----------------------------//


export const openModal = function (e, figures) {
    //inséré les figures dans le tableau globalFigures
    globalFigures = figures;
    //generer les figures
    figures.forEach(function (figure) {
        genererFigureModal(figure);
    });
    e.preventDefault();
     // cible l'id modal1
    modal = document.querySelector(e.target.getAttribute("href"));
    //appel de la classe pour boutonClose et inner avec x
    const boutonClose = document.querySelector(".js-close-modal");
    boutonClose.innerHTML = "x";
    //Array.from pour avoir les éléments focusables dans un tableau
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
     //permet de selectionner le premier élément focusable avec tab
    focusables[0].focus();
    // enlève de display none attribué dans le HTML pour afficher la modale
    modal.style.display = null;
    // on retire le masquage d'élément pour les lecteurs d'écran (accessibilité)
    modal.removeAttribute("aria-hidden");
    //indique aux technologies d'assistance que les fenetre situées sous la boite de dialogue ne font pas partie de la boite modal (accessibilité)
    modal.setAttribute("aria-modal", "true");
    //ferme la fenetre lors du click
    modal.addEventListener("click", closeModal);
    //ferme la modal lors du clique sur le bouton
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
    //stop la propagation de fermeture lors du clique a l'interieur de la modale
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

/* --------------------- FERMETURE MODALE ---------------------------- */

const closeModal = function (e) {
    //si la modale s'affiche
    if (modal === null) return
    e.preventDefault();
    //supprimer les figures de la galerie modale
    document.querySelector(".gallery-modal").innerHTML = "";
    // ne plus afficher la modale
    modal.style.display = "none";
    //on masque la modale pour les lecteurs d'écran (accessibilité)
    modal.setAttribute("aria-hidden", "true"); 
    // on indique les fenetres sous la modale redevienne active (accessibilité)
    modal.removeAttribute("aria-modal"); 
    // on retire l'écoute du clique 
    modal.removeEventListener("click", closeModal); 
    //on retire la fermeture de la modale
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal); 
    // on retire le stop de propagation pour la fermeture
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation); 
    // on remet la valeur de la modal a null (elle ne s'affiche plus)
    modal = null; 
    //appel de la fonction pour retour à la page d'accueil
    retourPageAccueilModale();
    //appelle de la gallerie et suppression des figures sur la page d'accueil
    const gallerie = document.querySelector(".gallery");
    gallerie.innerHTML = "";
    //regenerer les figures
    globalFigures.forEach(function (figure) {
        genererFigure(figure);
    });
}

/* -------------------------STOP PROPAGATION------------------------ */

const stopPropagation = function (e) {
    e.stopPropagation();
}


/* ------ PASSER DE LA "PREMIERE" PAGE MODALE A LA "DEUXIEME" ------- */

//constante de la page modale ajouter projets
const boutonAjouterProjet = document.getElementById("ajouter-projets");
const boutonRetour = document.querySelector(".fleche-retour");
const ajouterSupprimerProjets = document.getElementById("ajouter-supprimer");
const boutonValider = document.getElementById("valider");
const ajoutProjet = document.getElementById("ajout-projets");
const titreModal = document.getElementById("titre-modal");
const gallerieModal = document.querySelector(".gallery-modal")
const titre = document.getElementById("ajouter-titre");
const imgPreview = document.getElementById('img-preview');

//fonction pour passer de la première à la deuxième page
const ajouterDesProjets = function () {
    //modifier le titre "Gallerie photo" en "Ajout photo"
    titreModal.innerText = "Ajout photo";
    //supprime l'affichage de la gallerie
    gallerieModal.style.display = "none";
    //affiche le formulaire qui permet l'ajout des figures
    ajoutProjet.style.display = "block";
    //affichage du bouton retour
    boutonRetour.style.display = "block";
    //suprime l'affichage des boutons "Ajouter une photo" et "Supprimer la gallerie"
    ajouterSupprimerProjets.style.display = "none";
    //affiche le bouton "valider"
    boutonValider.style.display = "block";
    //activer le bouton envoyer
    boutonEnvoyerForm()
};


/* ------ RETOURNER DE LA "DEUXIEME" PAGE MODALE A LA "PREMIERE" ------- */
const retourPageAccueilModale = function () {
    //modifie le titre "Ajout photo" en "Gallerie photo"
    titreModal.innerText = "Galerie photo";
    //affiche la gallerie modale
    gallerieModal.style.display = "grid";
    //supprime l'affichage du formulaire qui permet d'ajouter des figures
    ajoutProjet.style.display = "none";
    //supprime l'affichage du bouton retour
    boutonRetour.style.display = "none";
    //affiche les boutons "Ajouter une photo" et "Supprimer la gallerie"
    ajouterSupprimerProjets.style.display = "flex";
    //supprime l'affichage du bouton "valider"
    boutonValider.style.display = "none";
    //supprime ce qui est écrit dans l'input titre
    titre.value = "";
    //reinitialise l'ajout de photo 
    reinitialiserAjouterPhoto();
    boutonEnvoyerFormDesactive();
};

boutonAjouterProjet.addEventListener("click", ajouterDesProjets);
boutonRetour.addEventListener("click", retourPageAccueilModale);

/* -------------SELECTIONNER L'IMAGE DU NOUVEAU PROJET--------------- */

const photoSelector = document.getElementById('file');
const textAjouterPhoto = document.getElementById("ajout-photo");
const pngJpg = document.getElementById("legende-photo");
const logoImage = document.getElementById("logo-image");

photoSelector.addEventListener('change', function (event) {
    //suppression du texte " + Ajouter Photo"
    textAjouterPhoto.style.display = "none";
    //suppression du texte "png, jpg : 4mo max"
    pngJpg.style.display = "none";
    //suppression du logo
    logoImage.style.display = "none";
    //affichage de la prévisualisation de l'image selectionnée
    imgPreview.style.display = "block";
    //source de l'image sélectionnée
    imgPreview.src = URL.createObjectURL(event.target.files[0]);
    //libère l'url de la source de l'image
    imgPreview.onload = function () {
        URL.revokeObjectURL(imgPreview.src);
    }
})

const reinitialiserAjouterPhoto = function () {
    //affichage du texte " + Ajouter Photo"
    textAjouterPhoto.style.display = null;
    //affichage du texte "png, jpg : 4mo max"
    pngJpg.style.display = null;
    //affichage du logo
    logoImage.style.display = null;
    //suppression de la prévisualisation de l'image selectionnée
    imgPreview.style.display = null;
    //suppression de la source de l'image
    imgPreview.src = "";
}


/* ------------------ AJOUTER LE NOUVEAU PROJET -------------------------- */

async function callApiAjouterFigure(workForm) {
    console.log(workForm);
    let token = window.sessionStorage.getItem("token");
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`
        },
        body: workForm
    })
    return response
};

//activation bouton valider
const boutonEnvoyerForm = function () {

    const photo = document.getElementById("file");
    const titre = document.getElementById("ajouter-titre");
    const valider = document.getElementById("valider");

    titre.addEventListener("change", function () {
        if (photo.value != "" && titre.value != "") {
            valider.removeAttribute("disabled");
            valider.style.backgroundColor = "#1D6154"
        }
    })

    photo.addEventListener("change", function () {
        if (photo.value != "" && titre.value != "") {
            valider.removeAttribute("disabled");
            valider.style.backgroundColor = "#1D6154"
        }
    })
}

//desactivation bouton valider

const boutonEnvoyerFormDesactive = function () {
    const valider = document.getElementById("valider");
    valider.getAttribute("disabled");
    valider.style.backgroundColor = null;
}



// envoi du formulaire avec method POST
const ajouterProjet = function () {
    const formAjoutProjets = document.querySelector("#ajout-projets"); //reccuperation du formulaire

    formAjoutProjets.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = event.target.querySelector("#ajouter-titre").value
        const image = document.querySelector("input[type='file']");
        const workForm = new FormData();

        workForm.append("image", image.files[0]);
        workForm.append("title", title);
        workForm.append("category", parseInt(
            event.target.querySelector("#choisir-categorie").value
        ))

        const afficherNouveauProjet = document.createElement("figure");
        const gallerieModal = document.querySelector(".gallery-modal");

        const imageProjet = document.createElement("img");
        imageProjet.crossOrigin = "anonymous";
        const nomProjet = document.createElement("figcaption");
        nomProjet.innerText = "editer";

        // appel à l'api
        callApiAjouterFigure(workForm)
            .then((res) => {
                if (!res.ok) { //si la connexion ne se fait pas
                    res.json().then((body) => {
                        throw body.message
                    }).catch((error) => {
                        console.log(error);
                        alert(error);
                    });
                }
                res.json().then((body) => {
                    console.log(body)
                    globalFigures.push(body)
                    imageProjet.src = body.imageUrl
                    imageProjet.alt = title;
                    afficherNouveauProjet.appendChild(imageProjet)
                    afficherNouveauProjet.appendChild(nomProjet)
                    gallerieModal.appendChild(afficherNouveauProjet);
                    const boutonPoubelle = creePoubelle();
                    
                    boutonPoubelle.dataset.workId = body.id;
                    
                    afficherNouveauProjet.appendChild(boutonPoubelle);

                    //supprimer des éléments de la gallerie
                    boutonPoubelle.addEventListener("click", callBackSupprimer(body))

                    retourPageAccueilModale();
                })
            });
    })
}

ajouterProjet();



//--------------------------------------------------------------------



