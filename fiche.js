function displaySprite(element) {
    const spriteContainer = document.querySelector(".sprite");
    const sprite = document.createElement("img");

    sprite.src = element.sprites.regular;

    spriteContainer.appendChild(sprite);
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
        displaySprite(data)
    })
})
})