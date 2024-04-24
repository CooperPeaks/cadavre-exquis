// Retrieve HTML elements
const storyElements = document.querySelectorAll('.story-full')
const titleRadio = document.getElementById('titleRadio')
const genreRadio = document.getElementById('genreRadio')
const authorRadio = document.getElementById('authorRadio')
const searchQuery = document.getElementById('searchQuery').getAttribute('data-value').trim();
// Convert story to Array to make a for loop
let storyArray = Array.from(storyElements)

console.log(storyArray);

function applyFilter() {
    // For every story...
    storyArray.forEach(story => {
        // Remove the hidden attribute to reset previous filtering
        story.removeAttribute('hidden');

        // Retrieve genre and author elements
        let titleNameElements = story.querySelectorAll('.story-title')
        let genreNameElements = story.querySelectorAll('.genre-name');
        let authorNameElements = story.querySelectorAll('.author-name');

        titleNameElements.forEach(titleNameElement => {
            let titleName = titleNameElement.textContent.trim().toLowerCase()

            if (titleRadio.checked && titleName !== searchQuery.toLowerCase()) {
                story.setAttribute('hidden', true)
            }
        })

        // For each genre...
        genreNameElements.forEach(genreNameElement => {
            // Create a string var with the text content of the element
            let genreName = genreNameElement.textContent.trim().toLowerCase();
            console.log("Genre : " + genreName);
            
            // If the user click on the genre input radio and the genre doesn't match the search query...
            if (genreRadio.checked && genreName !== searchQuery.toLowerCase()) {
                // Hide the whole html element to filter
                story.setAttribute('hidden', true);
            }
        });

        // Same thing for author
        authorNameElements.forEach(authorNameElement => {
            let authorName = authorNameElement.textContent.trim().toLowerCase();
            console.log("Author: " + authorName);
            
            // If the user click on the author input radio and the author doesn't match the search query...
            if (authorRadio.checked && authorName !== searchQuery.toLowerCase()) {
                // Hide the whole html element to filter
                story.setAttribute('hidden', true);
            }
        });
    });
}

// Apply filter when radio button changes
titleRadio.addEventListener('change', applyFilter)
genreRadio.addEventListener('change', applyFilter);
authorRadio.addEventListener('change', applyFilter);

// Apply filter initially
applyFilter();


// // For every story...
// storyArray.forEach(story => {
//     // Retrieve genre and author elements
//     let genreNameElements = story.querySelectorAll('.genre-name')
//     console.log(genreNameElements);
//     // For each genre...
//     genreNameElements.forEach(genreNameElement => {
//         // Create a string var with the text content of the element 
//         let genreName = genreNameElement.textContent.trim()
//         console.log("Genre : " + genreName);
//         // If the user click on the genre input radio... 
//         genreRadio.addEventListener('click', ()=> {
//             // Compare genreName with the string from the search input
//             if (genreName.toLowerCase() !== searchQuery.toLowerCase()) {
//                 // If different, hide the whole html element to filter
//                 story.setAttribute('hidden', true)
//             }
//         })
        
//     })

//     // Same thing for author
//     let authorNameElements = story.querySelectorAll('.author-name')
//     authorNameElements.forEach(authorNameElement => {
//         let authorName = authorNameElement.textContent.trim()
//         console.log("Author " + authorName);
//         authorRadio.addEventListener('click', ()=> {
//             if (authorName.toLowerCase() !== searchQuery.toLowerCase()) {
//                 story.setAttribute('hidden', true)
//             }
//         })
//     })
// })

