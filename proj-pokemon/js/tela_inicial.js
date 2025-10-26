document.addEventListener('DOMContentLoaded', () => {

    const pokemonListElement = document.getElementById('lista_pokemons');

    const favoriteFilterButton = document.getElementById('botao_favoritar');

    const statusMessage = document.getElementById('mensagem_status');

    const prevButton = document.getElementById('botao_anterior');
    const nextButton = document.getElementById('botao_posterior');

    const detailsModal = document.getElementById('detalhes_modal');
    const pokemonDetailsElement = document.getElementById('detalhes_pokemon');
    const closeButton = document.getElementById('.close-button');

    const pokeapi_base_url = 'https://pokeapi.co/api/v2/pokemon';
    const pokemonLimit = 20;
    let currentOffset = 0;
    let isFilteringFavorites = false;
})