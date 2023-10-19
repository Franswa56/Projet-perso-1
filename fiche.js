function displaySpriteAndName(element) {
    const spriteContainer = document.querySelector(".fiche-container");
    const nameContainer = document.querySelector(".name-container");
    const sprite = document.createElement("img");
    const nameFr = document.createElement("p");
    const nameEn = document.createElement("p");
    const nameJp = document.createElement("p");
    const title = document.createElement("h1")


    sprite.src = element.sprites.regular;
    sprite.className = "image-fiche"
    title.innerHTML = `Fiche de ${element.name.fr}`
    nameFr.innerHTML = `${element.name.fr} <img src="assets/fr.png" />`;
    nameFr.className = "name"
    nameEn.innerHTML = `${element.name.en} <img src="assets/en.png" />`;
    nameEn.className = "name"
    nameJp.innerHTML = `${element.name.jp} <img src="assets/jp.png" />`;
    nameJp.className = "name"

    nameContainer.appendChild(nameFr);
    nameContainer.appendChild(nameEn);
    nameContainer.appendChild(nameJp);
    spriteContainer.appendChild(sprite);
}

function displayTitle(element) {
    const title = document.createElement("h1");
    const header = document.querySelector(".header-container");

    title.innerHTML = `Fiche de ${element.name.fr}`;
    title.className = "header-title"
    header.appendChild(title);
}






// récupération de l'ID dans l'url 

document.addEventListener("DOMContentLoaded", () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonID = urlParams.get("id");
    console.log(pokemonID)

    fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${pokemonID}`)

    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()

    .then(data => {
        console.log(data)
        displayTitle(data)
        displaySpriteAndName(data)
    })
})
})