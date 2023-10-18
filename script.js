function displayElements(elements, i) {
    const gallery = document.querySelector(".gallery");
    const arrowsDisplay = document.querySelector(".arrows");
    gallery.innerHTML = "";
    
    // Obtenez le premier Pokémon
    const element = elements[i];
 
    // Crée un nouvel élément "article"
    const article = document.createElement("article");
    const loader = document.createElement("div");
    loader.className = "loader";

    
       
    // Crée un nouvel élément "img" pour la photo
    const image = new Image();
    image.src = element.sprites.regular;
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
        article.appendChild(image)
        article.appendChild(title);

    }
       
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(image);

   
    
 
    // Ajoute l'élément "article" à la div "gallery"
    gallery.appendChild(article);
}


function displayShinyElements(elements, i) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    
    // Obtenez le premier Pokémon
    const element = elements[i];
 
    // Crée un nouvel élément "article"
    const article = document.createElement("article");
       
    // Crée un nouvel élément "img" pour la photo
    const image = document.createElement("img");
    image.src = element.sprites.shiny;
    image.alt = element.name.fr;
       
    // Crée un nouvel élément "p" pour le titre
    const title = document.createElement("p");
    title.innerText = element.name.fr;
       
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(image);
    article.appendChild(title);
 
    // Ajoute l'élément "article" à la div "gallery"
    gallery.appendChild(article);
}




fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {

let i = 1

if (i === 0) {i = 28}
    
displayElements(data, i)

const rightArrow = document.getElementById("right-arrow");
const leftArrow = document.getElementById("left-arrow");

rightArrow.addEventListener("click",() => {

    i ++
    if (fullStar.style.display === "block") {
        displayShinyElements(data, i)
    } else {
    displayElements(data, i)
    }
})

leftArrow.addEventListener("click",() => {
    i --
    if (fullStar.style.display === "block") {
        displayShinyElements(data, i)
    } else if (i === 0){ 
        i = 1000
    } else {
    displayElements(data, i)
    }
})

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







