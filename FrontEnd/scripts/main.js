async function callApiWorks() {
	const response = await fetch('http://localhost:5678/api/works');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    console.log("Les donnees", data)
    return (data);
}

function genererFigure(work) {

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

console.log("a");

callApiWorks().then((figures) => {
    const filtres = new Set([]); 

    figures.forEach((figure) => {
        filtres.add(figure.category.name);
        genererFigure(figure);
    });

    const conteneurFiltres = document.querySelector("#filtres");

    const boutonTout = document.createElement("button");
    boutonTout.innerText = "Tout";
    conteneurFiltres.appendChild(boutonTout);

    boutonTout.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = "";
        figures.forEach(genererFigure);
    });

    filtres.forEach((filtre) => { 
        const boutonFiltre = document.createElement("button");

        boutonFiltre.innerText = filtre; 

        conteneurFiltres.appendChild(boutonFiltre);

        boutonFiltre.addEventListener("click", () => {
            const projetsFiltrees = figures.filter((figure) => {
                return figure.category.name === filtre;
            });
            document.querySelector(".gallery").innerHTML = "";
            console.log("z", figures)
            projetsFiltrees.forEach(genererFigure);
            });
        });
        
        boutonTout.addEventListener("click", () => {
            document.querySelector(".gallery").innerHTML = "";
            figures.forEach(genererFigure);
        });
});
console.log("b")









