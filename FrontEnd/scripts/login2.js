
function addUser() {
  const formulaire = document.querySelector(".form-login");
  formulaire.addEventListener("submit", function (event) {


    const user = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#pass").value
    };
   console.log("b", email.value, pass.value);

    const chargeUtile = JSON.stringify(user);
  
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile
    });
  })
}

addUser();