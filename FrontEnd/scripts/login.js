
async function callApilogin(user) {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return response
};

//connexion utilisateur
const formulaire = document.querySelector(".form-login"); //reccuperation du formulaire de connexion

//fonction evenement lors du clique connexion
formulaire.addEventListener("submit", function (event) {
  for (let input of document.querySelectorAll(".form input")) {
    input.reportValidity();
  }
  event.preventDefault();
  //creation objet utilisateur email/password
  let user = {
    email: (event.target.querySelector("#email").value), //cible email
    password: (event.target.querySelector("#pass").value) // cible mot de passe
  };

  //appel à l'api
  callApilogin(user)
    .then((res) => {
      console.log(res)
      if (!res.ok) { //si la connexion ne se fait pas
        window.sessionStorage.removeItem("token");
        res.json().then((body) => {
          throw body.message
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      } else {
        document.location.href = "./index.html"; //retour à la page d'accueil si connexion ok 
        const token = res.json().then((body) => { //reccuperation du token
      console.log("token", body.token);
          let tokenUser = window.sessionStorage.setItem("token", body.token); //enregistrer le token dans le sessionstorage
        });
      }
    })
  });


/*  boutonLogin.removeAttribute('href');
je n'arrive pas a ne pas rediriger vers login qd logout,
et quand j'utilise removeAttribut je ne peux plus cliquer
sur login */


// reste a ne pas dirigé en cas de deconnexion et deconnexion, main.js tout en haut