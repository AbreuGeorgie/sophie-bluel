
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





const boutonLogin = document.querySelector(".login-logout"); 
boutonLogin.addEventListener("click", function (event) {
  event.preventDefault;
  window.localStorage.removeItem("token");
  boutonLogin.innerHTML = "login";
  });


// reste a ne pas dirigé en cas de deconnexion et deconnexion, main.js tout en haut