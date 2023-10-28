function displaySpriteAndName(element) {
    const spriteContainer = document.querySelector(".fiche-container");
    const nameContainer = document.querySelector(".name-container");
    const spriteAndName = document.querySelector(".sprite-name-container")
    const sprite = document.createElement("img");
    const nameFr = document.createElement("p");
    const nameEn = document.createElement("p");
    const nameJp = document.createElement("p");
    const description = document.createElement("h2");
    const title = document.createElement("h1");


    sprite.src = element.sprites.regular;
    sprite.className = "image-fiche"
    title.innerHTML = `Fiche de ${element.name.fr}`
    nameFr.innerHTML = `${element.name.fr} <img src="assets/fr.png" />`;
    nameFr.className = "name"
    nameEn.innerHTML = `${element.name.en} <img src="assets/en.png" />`;
    nameEn.className = "name"
    nameJp.innerHTML = `${element.name.jp} <img src="assets/jp.png" />`;
    nameJp.className = "name"
    description.innerHTML = element.category;
    description.className = "description";

    nameContainer.appendChild(nameFr);
    nameContainer.appendChild(nameEn);
    nameContainer.appendChild(nameJp);
    spriteAndName.appendChild(nameContainer);
    spriteAndName.appendChild(sprite);
    spriteContainer.appendChild(description);

}

// Fonction qui affiche le titre

function displayTitle(element) {
    const title = document.createElement("h1");
    const header = document.querySelector(".header-container");

    title.innerHTML = `Fiche de ${element.name.fr}`;
    title.className = "header-title"
    header.appendChild(title);
}

// Fonction pour afficher les statistique en diagramme

function createBarChart(data) {
    var stats = data.stats;
    var container = document.querySelector('.tableau-stats');

    // Pour chaque statistique, nous créons une barre
    for (var key in stats) {
        var value = stats[key];
        var bar = document.createElement('div');
        bar.className = 'bar bar-' + key;
        var percentage = value / 100;  // Ajustez cette partie en fonction de la valeur maximale possible pour vos statistiques
        var hue = percentage * 90; // Aller de rouge (0) à vert (120) dans le modèle de couleur HSL
        bar.style.height = value*3 + 'px'; // La hauteur est basée sur la valeur de la statistique
        bar.style.background = 'linear-gradient(to top, red, hsl(' + hue + ', 100%, 50%))';
        bar.innerHTML = value; // Afficher la valeur dans la barre
        container.appendChild(bar);
    }


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
        createBarChart(data)
    })
})
})