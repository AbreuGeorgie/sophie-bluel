/* -------------- FONCTION APPEL A L'API / POST ----------*/

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

/* -------------- CONNEXION UTILISATEUR ------------------------- */

//reccuperation du formulaire de connexion
const formulaire = document.querySelector(".form-login");

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  //creation objet utilisateur email/password
  let user = {
    //cible email
    email: (event.target.querySelector("#email").value),
    // cible mot de passe
    password: (event.target.querySelector("#pass").value)
  };

  //appel à l'api
  callApilogin(user)
    .then(function (res) {
      console.log(res)

      //si la connexion ne se fait pas
      if (!res.ok) {
        window.sessionStorage.removeItem("token");
        res.json().then(function (body) {
          throw document.getElementById('message-erreur').innerHTML = "E-mail ou mot de passe invalide";
        })

        //si connection ok
      } else {
        //n'affiche pas de message d'erreur
        document.getElementById('message-erreur').innerHTML = "";
        //retour à la page d'accueil 
        document.location.href = "./index.html";
        //reccuperation du token
        const token = res.json().then(function (body) {
          //enregistrer le token dans le sessionstorage
          let tokenUser = window.sessionStorage.setItem("token", body.token);
        });
      }
    })
});
