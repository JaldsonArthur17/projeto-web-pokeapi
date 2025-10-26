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
    
    // <-- CORREÇÃO 1: 'getElementById' só funciona com IDs (sem '.').
    //     Para selecionar por classe, usamos 'querySelector'.
    const closeButton = document.querySelector('.close-button');

    //variaveis de estado
    const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const POKEMON_LIMIT = 20;
    let currentOffset = 0;
    let isFilteringFavorites = false;

    // <-- CORREÇÃO 2: Funções movidas para FORA de loadPokemon.
    //     Elas devem ser definidas no escopo principal.
    function showMessage(text) {
        statusMessage.textContent = text;
        statusMessage.style.display = 'block';
    }

    function hideMessage() {
        statusMessage.style.display = 'none';
    }

    async function loadPokemon () {
        pokemonListElement.innerHTML = '';

        // <-- CORREÇÃO 4: Esta chamada agora funciona,
        //     pois a função showMessage está definida no escopo correto.
        showMessage('carregando pokemon...')

        // (Nota: A lógica de fetch da API e renderização dos cards
        //  ainda precisa ser implementada aqui.)
        const pokemonCardHTML = `
            <div class="card_pokemon" data-id="1">
                <button class="botao_favoritar_card" data-id="1">🤍</button>
                <img src="..." alt="Nome do Pokemon">
                <h3>#1 - Bulbasaur</h3>
            </div>
        `;
        // (A variável pokemonCardHTML acima não está sendo usada)

        hideMessage();

        // <-- CORREÇÃO 5: Chamada recursiva removida daqui.
        //     Isso causava um loop infinito que travava o navegador.
        // loadPokemon();
    }

    // <-- CORREÇÃO 3: Todos os 'addEventListener' movidos para FORA
    //     da função loadPokemon. Eles devem ser registrados apenas UMA VEZ.

    nextButton.addEventListener('click', () => {
        currentOffset += POKEMON_LIMIT;
        // <-- CORREÇÃO 7: Adicionada a chamada a loadPokemon()
        //     para que a lista atualize ao clicar em "próxima".
        loadPokemon();
    });

    prevButton.addEventListener('click', () => {
        if (currentOffset >= POKEMON_LIMIT) {
            currentOffset -= POKEMON_LIMIT;
            loadPokemon();
        }
    });

    searchButton.addEventListener('click', () => {
        // <-- CORREÇÃO 9: Propriedade corrigida de 'ariaValueMax' para 'value'.
        const query = searchInput.value.trim();
        if (query) {
            // (Lógica de busca precisa ser implementada aqui)
        } else {
            loadPokemon();
        }
    });

    favoriteFilterButton.addEventListener('click', () => {
        // (Lógica de filtro precisa ser implementada aqui)
    });

    // (Este listener agora funciona pois 'closeButton' foi corrigido)
    closeButton.addEventListener('click', () => {
        detailsModal.style.display = 'none';
    });

    pokemonListElement.addEventListener('click', (e) => {
        const card = e.target.closest('.card_pokemon');
        
        // <-- CORREÇÃO 10: Corrigido erro de digitação de 'closes' para 'closest'.
        const favButton = e.target.closest('.botao_favoritar_card');

        if (favButton) {
            e.stopPropagation();
            console.log('Você favoritou o ID:', favButton.dataset.id);
        } else if (card) {
            console.log('Abrir detalhes do ID:', card.dataset.id);
            detailsModal.style.display='block';
        }
    });

    // <-- CORREÇÃO 6: Adicionada a chamada inicial para
    //     carregar os pokémon quando a página abrir.
    loadPokemon();

});