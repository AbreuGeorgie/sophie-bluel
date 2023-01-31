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
    // console.log("gallery", gallery)
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

function genererFiltre(conteneurFiltres, categoryName, works) {

    //boutons filtres
    const boutonFiltre = document.createElement("button");
    boutonFiltre.id = `btn-${categoryName}`.toLowerCase();
    boutonFiltre.innerText = categoryName;
    
/*     const boutonFiltreObjet = document.getElementById("btn-objets") ;
    boutonFiltreObjet.addEventListener ("click", function() {
       const objetsFiltres = works.filter(function (works) {
                return works === 'objets'
                })
            })

    
 */

    conteneurFiltres.appendChild(boutonFiltre);
}

callApiWorks().then((works) => {
    const filtres = new Set(["Tout"]);
    const divFilterbloque = document.querySelector("#filtres");

    works.forEach((work) => {
        filtres.add(work.category.name);
        genererFigure(work);
    });
    console.log("categorie", filtres); 
    console.log("divFilterbloque", divFilterbloque)

    filtres.forEach(categoryName => {
        genererFiltre(divFilterbloque, categoryName, works)
    });
})
