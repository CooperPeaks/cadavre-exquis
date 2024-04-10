// let button = document.querySelector('button')
// button.addEventListener("click", function(event) {
//     event.preventDefault()
//     console.log('hello');
// })

function StoryCheck() {
    let storyTitle = document.getElementById('title').value.trim()
    let storyContent = document.getElementById('articleContent').value.trim()

    if (storyTitle.length < 2) {
        alert("Le titre doit comporter plus de 2 caractères")
    }
    else if (storyContent.length < 2) {
        alert("Le contenu de votre histoire doit comporter au moins x mots")
    }
}

