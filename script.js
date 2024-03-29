function displayElements(elements, i) {
    const gallery = document.querySelector(".gallery");
    //const arrowsDisplay = document.querySelector(".arrows");
    gallery.innerHTML = "";
    
    // Obtenez le premier Pokémon
    const element = elements[i];
 
    // Crée un nouvel élément "article"
    const article = document.createElement("article");
    const lien = document.createElement("a");
    lien.href = `details.html?id=${element.pokedexId}`;
    const loader = document.createElement("img");
    loader.className = "loader";
    loader.src = "assets/loader.png"
      
    // Crée un nouvel élément "img" pour la photo
    const image = new Image();
    image.src = element.sprites.regular;
    image.alt = element.name.fr;

    //arrowsDisplay.style.visibility = "hidden";
    image.style.visibility = "hidden";

    // Crée un nouvel élément "p" pour le titre
    const title = document.createElement("p");
    title.innerText = element.name.fr;

    article.appendChild(loader)

    image.onload = function() {
        article.removeChild(loader);
        image.style.visibility = "visible";
        //arrowsDisplay.style.visibility = "visible";
        article.appendChild(lien);
        lien.appendChild(image)
        article.appendChild(title);

    }      
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(image); 
    // Ajoute l'élément "article" à la div "gallery"
    gallery.appendChild(article);
}


function displayShinyElements(elements, i) {
    const gallery = document.querySelector(".gallery");
    const arrowsDisplay = document.querySelector(".arrows");
    gallery.innerHTML = "";
    
    // Obtenez le premier Pokémon
    const element = elements[i];
 
    // Crée un nouvel élément "article"
    const article = document.createElement("article");
    const lien = document.createElement("a");
    lien.href = `details.html?id=${element.pokedexId}`;
    const loader = document.createElement("img");
    loader.className = "loader";
    loader.src = "assets/loader.png"
      
    // Crée un nouvel élément "img" pour la photo
    const image = new Image();
    image.src = element.sprites.shiny;
    image.alt = element.name.fr;

    arrowsDisplay.style.visibility = "hidden";
    image.style.visibility = "hidden";

    // Crée un nouvel élément "p" pour le titre
    const title = document.createElement("p");
    title.innerText = element.name.fr;

    article.appendChild(loader)

    image.onload = function() {
        article.removeChild(loader);
        image.style.visibility = "visible";
        arrowsDisplay.style.visibility = "visible";
        article.appendChild(lien);
        lien.appendChild(image)
        article.appendChild(title);

    }      
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(image); 
    // Ajoute l'élément "article" à la div "gallery"
    gallery.appendChild(article);
}




fetch("https://tyradex.vercel.app/api/v1/pokemon")
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {

let i = 1

// Cette fonction pourrait être utilisée pour trouver l'index d'un Pokémon spécifique dans votre tableau de données.
function findPokemonIndex(data, pokemonId) {
    return data.findIndex(pokemon => pokemon.pokedexId === pokemonId);
}

                           // Recherche d'un pokémon //

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const pokesearch = searchForm.querySelector("[name=pokemon]").value;

    fetch(`https://tyradex.vercel.app/api/v1/pokemon${pokesearch}`)
        .then(response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pokemonData => { 
            console.log(pokemonData);
            
            // Affiche le Pokémon recherché
            displaySearchedElements(pokemonData);
            
            // Trouve l'index du Pokémon dans le tableau de données original
            const foundIndex = findPokemonIndex(data, pokemonData.pokedexId);  // suppose que 'data' est votre tableau original de Pokémon
            if (foundIndex !== -1) {
                // Met à jour 'i' pour correspondre à l'index trouvé
                i = foundIndex;
            }
        })
        .catch(error => {
            console.error('Fetch Error: ', error);
        });
});

if (i === 0) {i = data.length}
    
displayElements(data, i)

const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");

rightArrow.addEventListener("click", () => {
    i++;

    // Si 'i' dépasse la fin du tableau, revenir au début.
    if (i >= data.length) {
        i = 0;
    }

    // Afficher les éléments en fonction de l'état de l'étoile (shiny ou non).
    if (fullStar.style.display === "block") {
        displayShinyElements(data, i);
    } else {
        displayElements(data, i);
    }
});

leftArrow.addEventListener("click", () => {
    i--;
    
    // Vérifier si 'i' est hors limites
    if (i < 0) {
        i = data.length - 1;  // Remarquez que nous utilisons 'data.length - 1' ici
    }

    if (fullStar.style.display === "block") {
        displayShinyElements(data, i);
    } else {
        displayElements(data, i);
    }
});

/// Transformation en shiny

const star = document.querySelector(".star");
const fullStar = document.querySelector(".full-star")

star.addEventListener("click", ()=> {
    fullStar.style.display = "block";
    star.style.display = "none";

displayShinyElements(data, i)
});

fullStar.addEventListener("click", ()=> {
    star.style.display = "block";
    fullStar.style.display = "none";

displayElements(data, i);
})
})

                           // Recherche d'un pokémon //
// Fonctions 

function displaySearchedElements(element) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    // Crée un nouvel élément "article"
    const article = document.createElement("article");
    const loader = document.createElement("div");
    loader.className = "loader";
      
    // Crée un nouvel élément "img" pour la photo
    const image = new Image();
    image.src = element.sprites.regular;
    image.alt = element.name.fr;

    image.style.visibility = "hidden";

    // Crée un nouvel élément "p" pour le titre
    const title = document.createElement("p");
    title.innerText = element.name.fr;

    article.appendChild(loader)

    image.onload = function() {
        article.removeChild(loader);
        image.style.visibility = "visible";
        article.appendChild(image)
        article.appendChild(title);
    }      
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(image); 
    // Ajoute l'élément "article" à la div "gallery"
    gallery.appendChild(article);
}

// Récupération de l'input de l'utilisateur

const searchForm = document.querySelector(".search-form")
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
const pokesearch = searchForm.querySelector("[name=pokemon]").value;

// envoi de l'input a la base de données

fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${pokesearch}`)
.then(response => { 
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
})
.then(data => { 
    console.log(data);
    displaySearchedElements(data)
    
})
.catch(error => {
    // La gestion des erreurs lancées se fait ici.
    console.error('Fetch Error: ', error);
    console.log("coucou")
});


})







