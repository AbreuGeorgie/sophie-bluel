import {callApiWorks, genererFigure} from "./work.js";

window.addEventListener('DOMContentLoaded', (event) => {
    if (window.localStorage.getItem("token") != null){
        const boutonLogin = document.querySelector(".login-logout");
        boutonLogin.innerHTML = "logout";
        document.getElementById("mode-edition").style.display = "flex";
        document.getElementById("modifier").style.display = "block";
    }

const boutonPublier = document.getElementById("publier-changements");
boutonPublier.addEventListener("click", function(){
    /*...*/
});

const boutonLogin = document.querySelector(".login-logout"); 
boutonLogin.addEventListener("click", function (e) {
    e.preventDefault
    if (window.localStorage.getItem("token") != null){
        window.localStorage.removeItem("token");
        boutonLogin.innerHTML = "login";
    }
  });

 /*  boutonLogin.removeAttribute('href');
  je n'arrive pas a ne pas rediriger vers login qd logout, 
  et quand j'utilise removeAttribut je ne peux plus cliquer 
  sur login */



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













