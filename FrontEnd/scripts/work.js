// import des données pour reccupérer les projets de l'architecte via l'API
export async function callApiWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return (data);
}

//fonction qui va permettre d'afficher les projets de l'architecte
export function genererFigure(work) {

    const projetArchitecte = document.createElement("figure");
    const gallerie = document.querySelector(".gallery");

    //création des images et nom des projets
    const imageProjet = document.createElement("img");
    imageProjet.crossOrigin = "anonymous";
    imageProjet.src = work.imageUrl;
    imageProjet.alt = work.title;
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = work.title;

    // on rattache les projets de l'architecte à la gallerie
    gallerie.appendChild(projetArchitecte);

    //ratachement des images et noms des projets aux projets de l'architecte
    projetArchitecte.appendChild(imageProjet);
    projetArchitecte.appendChild(nomProjet);
};
