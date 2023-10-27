    // Supposons que c'est la réponse de votre API
    var pokemonData = {/* insérez la réponse de l'API ici */};

    function createBarChart(data) {
        var stats = data.stats;
        var container = document.getElementById('.tableau-stats');
        var barContainer = document.createElement("div");

        // Pour chaque statistique, nous créons une barre
        for (var key in stats) {
            var value = stats[key];
            var bar = document.createElement('div');
            bar.className = 'bar';
            var percentage = value / 100;  // Ajustez cette partie en fonction de la valeur maximale possible pour vos statistiques
            var hue = percentage * 120; // Aller de rouge (0) à vert (120) dans le modèle de couleur HSL
            bar.style.height = value + 'px'; // La hauteur est basée sur la valeur de la statistique
            bar.style.backgroundColor = 'linear-gradient(to top, red, hsl(' + hue + ', 100%, 50%))';
            bar.innerHTML = value; // Afficher la valeur dans la barre
            barContainer.appendChild(bar);
        }

        container.appendChild(barContainer);
    }

    createBarChart(pokemonData);