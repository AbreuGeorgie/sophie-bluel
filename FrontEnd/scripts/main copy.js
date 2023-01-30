const baseDomain = 'http://localhost:5678'

// Appel à l'api
const apiCall = async (url) => {
    try {
      /* const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apiKey: apiKey,
        },
      } */
      // const url = `${baseDomain}/api/works`
      const response = await fetch(url)

      if (response.ok) {
        const res = await response.json()
        return res

      } else {
        throw new Error('Network response was not ok.')
      }

    } catch (error) {
      return error
    }
}
const works = apiCall(`${baseDomain}/api/works`).then((body) => {
    console.log(`La`, body)
      .forEach(work => {
        createFigureComponent(work)
    })
})



let portfolio = document.getElementById("portfolio")
let gallery = document.getElementById("gallery");

const createFigureComponent = (work) => {

        const imageElement = document.createElement("img");
        imageElement.src = work[i].imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = work[i].title;

        const figure = document.createElement("figure");

        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(nomElement);
}



/*
const reponse = await fetch('http://localhost:5678/api/works');
const 
.then((response) => {
    response.json().then((body) => {
        console.log(`La`, body)
        body.forEach(work => {
            createGaleryComponent(work)
        })
    })
})
 */
