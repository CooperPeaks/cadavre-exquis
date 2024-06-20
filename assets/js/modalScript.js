document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le bouton qui ouvre la modale
    var btn = document.querySelector('[data-bs-toggle="modal"][data-bs-target="#myModal"]');

    // Récupérer la modale
    var modal = document.getElementById('myModal');
    var bootstrapModal = new bootstrap.Modal(modal);

    // Fonction pour vérifier l'état de l'authentification de l'utilisateur
    function checkAuthenticationStatus(event) {
        event.preventDefault(); // Empêcher l'action par défaut
        fetch('/check-authentication') // Envoyer une requête vers la route de vérification d'authentification
            .then(response => response.json())
            .then(data => {
                if (!data.authenticated) {
                    // Utilisateur non connecté : afficher la modale
                    bootstrapModal.show();
                } else {
                    // Utilisateur connecté : rediriger vers la page souhaitée
                    window.location.href = btn.href;
                }
            })
            .catch(error => console.error('Erreur lors de la vérification de l\'authentification:', error));
    }

    // Ajouter l'événement de clic au bouton pour vérifier l'authentification avant d'afficher la modale
    btn.addEventListener('click', checkAuthenticationStatus);
});