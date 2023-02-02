async function callApiWorks() {
	const response = await fetch('http://localhost:5678/api/works');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    console.log("Les donnees", data)
    return data
}

function genererFigure(work) {

    
    const gallerie = document.querySelector(".gallery");
    const projetsArchitecte = document.createElement("work");

    //création des images et nom des projets
    const imageProjet = document.createElement("img");
    imageProjet.crossOrigin = "anonymous";
    imageProjet.src = work.imageUrl;
    imageProjet.alt = work.title;
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = work.title;

    // on rattache les projets de l'architecte à la gallerie
    gallerie.appendChild(projetsArchitecte);

    //ratachement des images et noms des projets aux projets de l'architecte
    projetsArchitecte.appendChild(imageProjet);
    projetsArchitecte.appendChild(nomProjet);
};

function genererFiltre(conteneurFiltres, nomCategorie, figures) {

    /* const conteneurFiltres = document.querySelector('#filtres'); */
    const projetsArchitecte = document.createElement("work");

    const boutonFiltre = document.createElement("button");
    boutonFiltre.innerText = nomCategorie;

    conteneurFiltres.appendChild(projetsArchitecte);
    projetsArchitecte.appendChild(boutonFiltre);
};

callApiWorks().then((figures, filtres) => {
    const nomfiltres = new Set([]);      //qu'est ce que je dois mettre entre crochet???
    const conteneurFiltres = document.querySelector("#filtres");

    figures.forEach((work) => {
        nomfiltres.add(work.category.name);
        genererFigure(work);
    });
    console.log("categorie", nomfiltres); 
    console.log("conteneurfiltres", conteneurFiltres);

    filtres.forEach((nomCategorie) => {    //Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'forEach') je ne comprends pas 
        genererFiltre(conteneurFiltres, nomCategorie, figures)
    });

    boutonFiltre.addEventListener("click", function () {
        const projetsFiltrees = nomfiltres.filter(function (nomfiltres) {
            return nomfiltres.nomCategorie;
        });
       console.log(projetsFiltrees);
    });
})




