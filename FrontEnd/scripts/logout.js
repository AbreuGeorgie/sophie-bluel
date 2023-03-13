/* ---------------------- DECONNEXION UTILISATEUR ---------------------- */

export const logout = function () {
    //reccuperation du bouton Login
    const boutonLogin = document.querySelector(".login-logout");

    //deconnexion
    boutonLogin.addEventListener("click", function (e) {
        //si connecté
        if (window.sessionStorage.getItem("token") != null) {
            // ne pas rediriger 
            e.preventDefault()
            //supprime le token
            window.sessionStorage.removeItem("token");
            //remplace logout par login
            boutonLogin.innerHTML = "login";
            //supprime mode edition 
            document.getElementById("mode-edition").style.display = null;
            //supprime les boutons modifier
            document.getElementById("modifier").style.display = null;
            document.getElementById("modifier-photo").style.display = null;
        }
    });
}