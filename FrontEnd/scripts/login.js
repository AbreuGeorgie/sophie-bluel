
async function callApilogin(user) {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return response
};

const formulaire = document.querySelector(".form-login");

formulaire.addEventListener("submit", function (event) {
  for (let input of document.querySelectorAll(".form input")) {
    input.reportValidity();
  }
  event.preventDefault();
  let user = {
    email: (event.target.querySelector("#email").value),
    password: event.target.querySelector("#pass").value
  };

  callApilogin(user)
    .then((res) => {
      console.log(res)
      if (!res.ok) {
        window.localStorage.removeItem("token");
        // boutonLogin.innerHTML = "login";
        res.json().then((body) => {
          throw body.message
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      } else {
        document.location.href = "./index.html";
        const token = res.json().then((body) => {
          console.log("token", body.token);
          let tokenUser = window.localStorage.setItem("token", body.token);
          console.log('tokenUser', tokenUser);
        });
      }
    })
});



/* function seDeconnecter() {
  boutonLogin.addEventListener("click", function () {
    window.localStorage.removeItem("token");
    boutonLogin.innerHTML = "login";
  });
} 
 */



/* //Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');
if (pieces === null){
   // Récupération des pièces depuis l'API
   const reponse = await fetch('http://localhost:8081/pieces/');
   pieces = await reponse.json();
   // Transformation des pièces en JSON
   const valeurPieces = JSON.stringify(pieces);
   // Stockage des informations dans le localStorage
   window.localStorage.setItem("pieces", valeurPieces);
}else{
   pieces = JSON.parse(pieces);
}*/