document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonInfo = document.getElementById('pokemon-info');
    const pokemonList = document.getElementById('pokemonList');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon not found');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonInfo(data);
                showBorders();
            })
            .catch(error => {
                alert(error.message);
                clearPokemonInfo();
                hideBorders();
            });
    });

    function displayPokemonInfo(pokemon) {
        document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
        document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
        document.getElementById('height').textContent = `Height: ${pokemon.height}`;
        document.getElementById('hp').textContent = `HP: ${pokemon.stats[0].base_stat}`;
        document.getElementById('attack').textContent =`Attack: ${pokemon.stats[1].base_stat}`;
        document.getElementById('defense').textContent = `Defense: ${pokemon.stats[2].base_stat}`;
        document.getElementById('special-attack').textContent = `Special Attack: ${pokemon.stats[3].base_stat}`;
        document.getElementById('special-defense').textContent = `Special Defense: ${pokemon.stats[4].base_stat}`;
        document.getElementById('speed').textContent = `Speed: ${pokemon.stats[5].base_stat}`;

        const typesElement = document.getElementById('types');
        typesElement.innerHTML = '';
        pokemon.types.forEach(typeInfo => {
            const typeElement = document.createElement('p');
            typeElement.textContent = `Type: ${typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}`;
            typesElement.appendChild(typeElement);
        });

        const spriteElement = document.getElementById('sprite');
        if (spriteElement) {
            spriteElement.src = pokemon.sprites.front_default;
        } else {
            const img = document.createElement('img');
            img.id = 'sprite';
            img.src = pokemon.sprites.front_default;
            img.style.display = 'block';
            img.style.margin = '0 auto';
            pokemonInfo.appendChild(img);
        }
    }

    function clearPokemonInfo() {
        document.getElementById('pokemon-name').textContent = '';
        document.getElementById('pokemon-id').textContent = '';
        document.getElementById('weight').textContent = '';
        document.getElementById('height').textContent = '';
        document.getElementById('hp').textContent = '';
        document.getElementById('attack').textContent = '';
        document.getElementById('defense').textContent = '';
        document.getElementById('special-attack').textContent = '';
        document.getElementById('special-defense').textContent = '';
        document.getElementById('speed').textContent = '';
        document.getElementById('types').innerHTML = '';
        const spriteElement = document.getElementById('sprite');
        if (spriteElement) {
            spriteElement.remove();
        }
    }

    function showBorders() {
        const elements = document.querySelectorAll('#pokemon-info p, #pokemon-info h2');
        elements.forEach(element => {
            element.classList.add('bordered');
        });
    }

    function hideBorders() {
        const elements = document.querySelectorAll('#pokemon-info p, #pokemon-info h2');
        elements.forEach(element => {
            element.classList.remove('bordered');
        });
    }
});
