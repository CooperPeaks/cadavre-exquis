function StoryCheck(event) {
    event.preventDefault() // Prevent page reloading

    let storyTitle = document.getElementById('title').value.trim()
    let storyContent = document.getElementById('articleContent').value.trim()

    if (storyTitle.length < 2) {
        alert("Le titre doit comporter plus de 2 caractères")
    }
    else if (storyContent.length < 2) {
        alert("Le contenu de votre histoire doit comporter au moins x mots")
    }
    else {
        // If checkings ok, submit form
        event.target.submit()
    }
}

// Add storyCheck to form
document.querySelector('form').addEventListener('submit', StoryCheck);
