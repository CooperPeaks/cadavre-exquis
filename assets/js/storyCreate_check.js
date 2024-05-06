// let button = document.querySelector('button')
// button.addEventListener("click", function(event) {
//     event.preventDefault()
//     console.log('hello');
// })

function StoryCheck(event) {
    event.preventDefault() // Empêcher le rechargement de la page

    let storyTitle = document.getElementById('title').value.trim()
    let storyContent = document.getElementById('articleContent').value.trim()

    if (storyTitle.length < 2) {
        alert("Le titre doit comporter plus de 2 caractères")
    }
    else if (storyContent.length < 2) {
        alert("Le contenu de votre histoire doit comporter au moins x mots")
    }
    else {
        // Si les vérifications sont réussies, vous pouvez soumettre le formulaire
        // Vous pouvez accéder au formulaire avec event.target et utiliser submit()
        event.target.submit()
    }
}

// Ajoutez un écouteur d'événements sur le formulaire pour appeler StoryCheck() lorsqu'il est soumis
document.querySelector('form').addEventListener('submit', StoryCheck);
