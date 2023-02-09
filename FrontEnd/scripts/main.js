import {callApiWorks, genererFigure} from "./work.js";
window.addEventListener('DOMContentLoaded', (event) => {
    if (window.localStorage.getItem("token") == null){
        document.location.href = "./login.html";
    } else {
        const boutonLogin = document.querySelector(".login-logout");
        boutonLogin.innerHTML = "logout";
    }
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
    
});



console.log("b")













