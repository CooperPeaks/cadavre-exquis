// Récupérer le bouton qui ouvre la modale
var btn = document.querySelector(".home-link");

// Récupérer l'élément <span> qui ferme la modale
var span = document.getElementsByClassName("close")[0];

// Récupérer la modale
var modal = document.getElementById("myModal");

// Quand l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function (event) {
    event.preventDefault(); // Annuler le comportement par défaut du lien
    modal.style.display = "block";
}

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