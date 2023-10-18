function displayTeam(element) {
    const teamGallery = document.querySelector(".pokemon-team");
    // Crée un nouvel élément "article"
    const article = document.createElement("article");
       
    // Crée un nouvel élément "img" pour la photo
    const image = document.createElement("img");
    image.src = element.sprites.regular;
    image.alt = element.name.fr;

    //créer le lien pour la fiche pokédex 

    pokemonId = element.pokedexId;
    console.log(pokemonId)
    const lien = document.createElement("a");
    lien.href = `details.html?id=${pokemonId}`
       
    // Crée un nouvel élément "p" pour le titre
    const title = document.createElement("p");
    title.innerText = element.name.fr;
       
    // Ajoute l'image et le titre à l'élément "article"
    article.appendChild(lien);
    lien.appendChild(image)
    article.appendChild(title);

    // Ajoute l'article a la gallery (team)
    teamGallery.appendChild(article);
}


// JavaScript pour gérer les boutons
const typeButtons = document.querySelectorAll(".type-button");
const selectedTypes = []; // Tableau pour stocker les types sélectionnés

typeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");  // Ajoute ou supprime la classe "active" sur le clic
    const type = button.id; // Obtenez le type à partir de l'ID du bouton

        // Mettez à jour le tableau des types sélectionnés
        if (selectedTypes.includes(type)) {
            selectedTypes.splice(selectedTypes.indexOf(type), 1); // Déselectionne le type
          } else {
            selectedTypes.push(type);  // Sélectionne le type
            console.log(selectedTypes);
          }
      
          // Appelez la fonction pour afficher les Pokémon avec les types sélectionnés

});
});

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPokemon = data[randomIndex];

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomPokemon = data[randomIndex];

}})

const searchButton = document.querySelector(".generator");

searchButton.addEventListener("click", () => {
  fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const teamGallery = document.querySelector(".pokemon-team");
      teamGallery.innerHTML = ""; // Effacez le contenu précédent

      for (let i = 0; i < 6; i++) {
        let goodpokemon = null; // Initialisez goodpokemon à null

        // Filtrer les Pokémon en fonction des types sélectionnés
        const filteredPokemon = data.filter(pokemon => {
          return (
            pokemon.types &&
            selectedTypes.some(type => pokemon.types.some(pokemonType => pokemonType.name === type))
    )});

        if (filteredPokemon.length > 0) {
          // S'il y a des Pokémon correspondants, choisissez-en un au hasard
          const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
          goodpokemon = filteredPokemon[randomIndex];
        }

        console.log(goodpokemon)

        // goodpokemon contient maintenant un Pokémon dont le type correspond à un type sélectionné, ou null s'il n'y en a pas.
        displayTeam(goodpokemon);
      }
    });
});





