let allPokemon = [];

function createPokemonElement(pokemon) {
    const teamGallery = document.querySelector(".pokemon-team");

    // Crée un nouvel élément "article" pour chaque Pokémon
    const article = document.createElement("article");
    // Ajoute l'image du Pokémon
    const img = document.createElement("img");
    img.src = pokemon.sprites.regular;
    img.alt = pokemon.name.fr;
    article.appendChild(img);

    // Ajoute le nom du Pokémon
    const title = document.createElement("h3");
    title.textContent = pokemon.name.fr;
    article.appendChild(title);

    // Ajoute l'élément à la galerie
    teamGallery.appendChild(article);
}

function filterPokemonByType() {
  const teamGallery = document.querySelector(".pokemon-team");
  teamGallery.innerHTML = ''; // Efface les contenus précédents

  // Convertissons les types sélectionnés en minuscules pour une comparaison insensible à la casse
  const lowerCaseSelectedTypes = selectedTypes.map(type => type.toLowerCase());

  const filteredPokemon = allPokemon.filter(pokemon => {
      // Vérifiez si les types de Pokémon existent et effectuez le filtrage
      if (pokemon.types) {
          return pokemon.types.some(pokeType => 
              lowerCaseSelectedTypes.includes(pokeType.name.toLowerCase())
          );
      }
      return false; // si 'types' est absent, le Pokémon ne correspond pas au filtre
  });

  console.log(filteredPokemon); // Debug: affichez les Pokémon filtrés pour vérifier s'ils sont corrects
  filteredPokemon.forEach(createPokemonElement);
}

// Gestion des boutons de type de Pokémon
const typeButtons = document.querySelectorAll(".type-button");
const selectedTypes = [];

typeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const type = button.textContent; // Nous supposons ici que le nom du type est le contenu textuel du bouton
        button.classList.toggle("active");

        if (selectedTypes.includes(type)) {
            selectedTypes.splice(selectedTypes.indexOf(type), 1);
        } else {
            selectedTypes.push(type);
        }

    });
});

// Récupération initiale des données de tous les Pokémon depuis l'API
fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        allPokemon = data; // Sauvegarde la liste des Pokémon
        filterPokemonByType(); // Affichage initial (tous les Pokémon si aucun type n'est sélectionné)
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
    });


