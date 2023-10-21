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
    // Filtrer les Pokémon pour ceux dont les types correspondent à ceux sélectionnés
    const filteredPokemons = pokemons.filter(pokemon => {
        // Vérifier si 'types' existe et n'est pas null avant de continuer
        if (!pokemon.types) {
            return false; // exclure ce Pokémon du résultat final
        }

        // Récupérer les types de ce Pokémon
        const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.name);

        // Vérifier si tous les types sélectionnés sont présents dans les types de ce Pokémon
        return selectedTypes.every(selType => pokemonTypes.includes(selType));
    });

    console.log(filteredPokemons); // Affiche ou traite les Pokémon filtrés comme vous le souhaitez
    filteredPokemons.forEach(pokemon => {
    // Filtrer les Pokémon pour ceux dont les types correspondent à ceux sélectionnés
    const filteredPokemons = pokemons.filter(pokemon => {
        // Vérifier si 'types' existe et n'est pas null avant de continuer
        if (!pokemon.types) {
            return false; // exclure ce Pokémon du résultat final
        }

        // Récupérer les types de ce Pokémon
        const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.name);

        // Vérifier si tous les types sélectionnés sont présents dans les types de ce Pokémon
        return selectedTypes.every(selType => pokemonTypes.includes(selType));
    });

    console.log(filteredPokemons); // Affiche ou traite les Pokémon filtrés comme vous le souhaitez
    return filteredPokemons; // Retournez les Pokémon filtrés pour une utilisation ultérieure
})}
    


function createPokemonElement(pokemons) {
    const teamGallery = document.querySelector(".pokemon-team");
    teamGallery.innerHTML = ""; // Effacer le contenu actuel de la galerie

    pokemons.forEach(pokemon => {
        // Vérifie si les images nécessaires sont disponibles
        if (!pokemon.sprites || !pokemon.sprites.regular) {
            console.warn('Sprites manquants pour', pokemon.name.fr);
            return; // Ignore ce Pokémon et passe au suivant si les sprites ne sont pas disponibles
        }

        // Crée un nouvel élément "article" pour chaque Pokémon
        const article = document.createElement("article");

        // Ajoute l'image du Pokémon à l'article
        const img = document.createElement("img");
        img.src = pokemon.sprites.regular; // Assurez-vous que 'regular' est le bon chemin vers l'image
        img.alt = pokemon.name.fr; // Utilise le nom français du Pokémon
        article.appendChild(img);

        // Ajoute le nom du Pokémon si vous le souhaitez (optionnel)
        const name = document.createElement("h3");
        name.textContent = pokemon.name.fr; // Utilise le nom français du Pokémon
        article.appendChild(name);

        // Ajoute l'article à la galerie
        teamGallery.appendChild(article);
    });
}

// Gestion des boutons de type de Pokémon
document.addEventListener('DOMContentLoaded', (event) => {
    const typeButtons = document.querySelectorAll(".type-button");
    const selectedTypes = [];

    typeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.getAttribute('id'); // Obtenir l'ID du bouton, qui est le type de Pokémon
            button.classList.toggle("active");

            // Ajouter ou supprimer le type de la liste des types sélectionnés
            if (selectedTypes.includes(type)) {
                selectedTypes.splice(selectedTypes.indexOf(type), 1);
            } else {
                selectedTypes.push(type);
            }

            // Appliquer le filtre et mettre à jour l'affichage
            const filteredPokemons = filterPokemonByType(allPokemons, selectedTypes);
            console.log(filteredPokemons)
            createPokemonElement(filteredPokemons);
        });
    });
});