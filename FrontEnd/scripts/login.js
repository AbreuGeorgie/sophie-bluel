
async function callApilogin(user) {
  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  
  let result = await response.json();
  // alert(result.message);
  console.log("a", result)
  return result
};
  
const formulaire = document.querySelector(".form-login");

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  let user = {
    email: (event.target.querySelector("#email").value),
    password: event.target.querySelector("#pass").value
  };
  console.log("user", user)
  callApilogin(user).then((res)=>{
    document.location.href="./index.html";
  })
  
    .catch();

  //formulaire.submit();


});
  
      /* window.addEventListener("load", (event) => {
        console.log("page is fully loaded");
      }); */
  
   
  //{"userId":1,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NTUxNzE1OSwiZXhwIjoxNjc1NjAzNTU5fQ.WBBRIWsV4-cp3wY84-k83ZJ6escehX3cmrPRu1xVzXU"}