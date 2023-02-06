
async function callApilogin(user) {
  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
  let result = await response.json();
  console.log("a", result)
  return result
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

callApilogin(user).then((res) => {
    document.location.href = "./index.html";
    alert("Vous êtes connecté !");
    console.log("user", user)
  })
  .catch ((error) => {
  console.log(error);
  alert ("erreur");
  });
});


  //{"userId":1,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NTUxNzE1OSwiZXhwIjoxNjc1NjAzNTU5fQ.WBBRIWsV4-cp3wY84-k83ZJ6escehX3cmrPRu1xVzXU"}