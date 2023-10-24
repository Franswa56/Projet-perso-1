let allPokemons = [];

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
            const filteredPokemons = filterPokemonByType(allPokemons, selectedTypes);
            createPokemonElement(filteredPokemons);
        });
    });
});