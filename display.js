let allPokemons = [];
let filteredPokemons = [];

function fetchAllPokemon() {
    fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allPokemons = data; // Stocker les Pokémon dans la variable
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de la récupération des Pokémon:', error);
        });
}

// Appeler cette fonction au chargement de la page pour remplir la liste des Pokémon
fetchAllPokemon();

function filterPokemonByType(pokemons, selectedTypes) {
    // Cette fonction est maintenant plus propre et sans répétitions
    return pokemons.filter(pokemon => {
        const pokemonTypes = pokemon.types?.map(typeInfo => typeInfo.name);
        return selectedTypes.every(selType => pokemonTypes?.includes(selType));
    });
}

function createPokemonElement(pokemons) {
    const teamGallery = document.querySelector(".pokemon-team");
    teamGallery.innerHTML = ""; // Effacer le contenu actuel de la galerie

    pokemons.forEach(pokemon => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const lien = document.createElement("a");
        const pokemonId = pokemon.id
        lien.href = `details.html?id=${pokemon.pokedexId}`;
        img.src = pokemon.sprites.regular;
        img.alt = pokemon.name.fr;

        article.appendChild(lien);
        lien.appendChild(img);
        teamGallery.appendChild(article);
    });
}

// Ceci est déclenché lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll(".type-button");
    const selectedTypes = [];

    typeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.getAttribute('id');
            button.classList.toggle("active");

            const typeIndex = selectedTypes.indexOf(type);
            if (typeIndex === -1) {
                selectedTypes.push(type);
            } else {
                selectedTypes.splice(typeIndex, 1);
            }

            // Nous filtrons maintenant les Pokémon après chaque clic et mettons à jour l'affichage.
            filteredPokemons = filterPokemonByType(allPokemons, selectedTypes);
            createPokemonElement(filteredPokemons);
        });
    });
});

// Tri en fonctions des statistiques
// Points de vie
const pdvButton = document.querySelector(".hp-button");
pdvButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {

        return b.stats.hp - a.stats.hp
    });
    createPokemonElement(filteredPokemons)
})

// Attaque
const atkButton = document.querySelector(".attack-button");
atkButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {

        return b.stats.atk - a.stats.atk
    });
    createPokemonElement(filteredPokemons)
})
// Défense 
const defButton = document.querySelector(".defense-button");
defButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {

        return b.stats.def - a.stats.def
    });
    createPokemonElement(filteredPokemons)
})
// Attaque spéciale
const SatkButton = document.querySelector(".attackspe-button");
SatkButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {


        return b.stats.spe_atk - a.stats.spe_atk
    });
    createPokemonElement(filteredPokemons)
})
// Défense spécial 
const SdefButton = document.querySelector(".defensespe-button");
SdefButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {


        return b.stats.spe_def - a.stats.spe_def
    });
    createPokemonElement(filteredPokemons)
})
// Vitesse 
const vitButton = document.querySelector(".speed-button");
vitButton.addEventListener("click", ()=> {
    filteredPokemons.sort(function (a,b) {


        return b.stats.vit - a.stats.vit
    });
    createPokemonElement(filteredPokemons)
})