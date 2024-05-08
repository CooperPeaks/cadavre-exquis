// Récupérer le bouton qui ouvre la modale
var btn = document.querySelector(".home-link");

// Récupérer l'élément <span> qui ferme la modale
var span = document.getElementsByClassName("close")[0];

// Récupérer la modale
var modal = document.getElementById("myModal");

// Fonction pour vérifier l'état de l'authentification de l'utilisateur
function checkAuthenticationStatus() {
    fetch('/check-authentication') // Envoyer une requête vers la route de vérification d'authentification
        .then(response => response.json())
        .then(data => {
            if (!data.authenticated) {
                // Utilisateur non connecté : afficher la modale
                btn.onclick = function (event) {
                    event.preventDefault(); // Annuler le comportement par défaut du lien
                    modal.style.display = "block";
                }
            }
        })
        .catch(error => console.error('Erreur lors de la vérification de l\'authentification:', error));
}

// Appeler la fonction de vérification de l'authentification lorsque le script est chargé
window.onload = checkAuthenticationStatus;

// Quand l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function () {
    modal.style.display = "none";
}

// Quand l'utilisateur clique n'importe où en dehors de la modale, ferme-la
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}