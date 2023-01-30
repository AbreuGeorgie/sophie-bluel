let portfolio = document.getElementById("portfolio").children[1]
console.log(portfolio)

const works = 

fetch('http://localhost:5678/api/works')
.then((response) => {
    response.json().then((body) => {
        console.log(body)
        body.forEach(work => {
            portfolio.innerHTML = `
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>
            `
        })
    })
})