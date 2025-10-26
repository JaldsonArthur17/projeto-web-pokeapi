document.addEventListener('DOMContentLoaded', () => {

    //lista
    const pokemonListElement = document.getElementById('lista_pokemons');

    //busca
    const searchInput = document.getElementById('pesquisa');
    const searchButton = document.getElementById('botao_pesquisa');

    //botao de filtragem e favoritos
    const favoriteFilterButton = document.getElementById('botao_favoritar');

    //mensagem de status
    const statusMessage = document.getElementById('mensagem_status');

    //botões de paginção
    const prevButton = document.getElementById('botao_anterior');
    const nextButton = document.getElementById('botao_posterior');

    //modais de detalhes
    const detailsModal = document.getElementById('detalhes_modal');
    const pokemonDetailsElement = document.getElementById('detalhes_pokemon');
    const closeButton = document.getElementById('.close-button');

    //variaveis de estado
    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const POKEMON_LIMIT = 20;
    let currentOffset = 0;
    let isFilteringFavorites = false;



    async function loadPokemon () {
        pokemonListElement.innerHTML = '';

        showMessage('carregando pokemon...')

    const pokemonCardHTML = `
            <div class="card_pokemon" data-id="1">
                <button class="botao_favoritar_card" data-id="1">🤍</button>
                <img src="..." alt="Nome do Pokemon">
                <h3>#1 - Bulbasaur</h3>
            </div>
        `;

        hideMessage();

        function showMessage(text) {
            statusMessage.textContent = text;
            statusMessage.style.display = 'block';
        }

        function hideMessage() {
            statusMessage.style.display = 'none';
        }

        loadPokemon();

        nextButton.addEventListener('click', () => {
            currentOffset += POKEMON_LIMIT
        });

        prevButton.addEventListener('click', () => {
            if (currentOffset >= POKEMON_LIMIT) {
                currentOffset -= POKEMON_LIMIT;
                loadPokemon();
            }
        });

        searchButton.addEventListener('click', () => {
            const query = searchInput.ariaValueMax.trim();
            if (query) {
            } else {
                loadPokemon();
            }
        });

        favoriteFilterButton.addEventListener('click', () => {
        });

        closeButton.addEventListener('click', () => {
            detailsModal.style.display = 'none';
        });

        pokemonListElement.addEventListener('click', (e) => {
            const card = e.target.closest('.card_pokemon');
            const favButton = e.target.closest('.botao_favoritar_card');

            if (favButton) {
                e.stopPropagation();
                console.log('Você favoritou o ID:', favButton.dataset.id);
            } else if (card) {
                console.log('Abrir detalhes do ID:', card.dataset.id);
                detailsModal.style.display='block';
            }
        });
    });
});