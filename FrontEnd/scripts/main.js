async function projetArchitect() {
	const response = await fetch(
		'http://localhost:5678/api/works'
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    console.log("Les donnees", data)
    return data
}

/* const reponse = await fetch('http://localhost:5678/api/works');
setTimeout(()=>{}, 500) */
const figure = projetArchitect();

for (let i = 0; i < figure.length; i++) {

    const work = figure[i];

    //recuperation de l'element du dom qui accueillera les figures
    const gallery = document.querySelector(".gallery");

    //creation d'une balise dediee a un lieu
    const projetElement = document.createElement("work");

    //création des balises
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = work.title;

    // on rattache la balise figure à la section gallery
    gallery.appendChild(projetElement);

    //ratachement de l'image a projetElement (la balise work)
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
}
