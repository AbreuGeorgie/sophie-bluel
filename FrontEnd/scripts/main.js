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

    //recuperation de l'element du dom qui accueillera les figures
    const gallery = document.querySelector(".gallery");
    console.log("gallery", gallery)
    //creation d'une balise dediee a un projet
    const projetElement = document.createElement("work");

    //création des balises
    const imageElement = document.createElement("img");
    imageElement.crossOrigin = "anonymous";
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = work.title;

    // on rattache la balise figure à la section gallery
    gallery.appendChild(projetElement);

    //ratachement de l'image a projetElement (la balise work)
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
};

const filtres=new Set(["Tout", "Objets", "Appartements", "Hôtels et restaurant"]);
for (value of filtres) {
  console.log(value);
}
    
/* const boutonFiltrer = document.querySelector(".btn-filtrer");

    boutonFiltrer.addEventListener("click", function(){
        const piecesFiltrees = pieces.filtre (function (piece) {
            return piece.prix <= 35;
        })

        console.log(piecesFiltrees);
    })

    const boutonFiltrerDescription = document.querySelector(".btn-filterDescription")

    boutonFiltrerDescription.addEventListener("click", function() {
        const descriptionFiltrees = description.filtre((descriptions) => {
            return descriptions
        })
    }) */

callApiWorks().then((works) => {
    works.forEach((work, i) => {
        genererFigure(work);
    });
    const categorie = work.map(work => work.categorie);
});

