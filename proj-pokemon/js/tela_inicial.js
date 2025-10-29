const pokemonName = document.querySelector('.Nome_Pokemon');
const pokemonNumber = document.querySelector('.Numero_Pokemon');
const pokemonImage = document.querySelector('.Imagem_Pokemon');

const form = document.querySelector('.Form_Pokemon');
const input = document.querySelector('#pesquisa');
const buttonPrev = document.querySelector('#botao_anterior');
const buttonNext = document.querySelector('#botao_posterior');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
}
};

const renderPokemon = async (pokemon) => {
const messageStatus = document.querySelector('#mensagem_status');
messageStatus.textContent = 'Carregando o Pokémon...';  
pokemonName.textContent = 'Carregando...';
pokemonNumber.textContent = '';

const data = await fetchPokemon(pokemon);

if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;

    // Verificr se imagem ta rodando
    const sprite =
    data.sprites.versions['generation-v']['black-white'].animated.front_default ||
    data.sprites.front_default;

    pokemonImage.src = sprite;
    messageStatus.textContent = '';
    input.value = '';
    searchPokemon = data.id;
} else {
    pokemonImage.style.display = 'none';
    pokemonName.textContent = 'Não encontrado :c';
    pokemonNumber.textContent = '';
    messageStatus.textContent = 'Pokémon não encontrado.';
}
};

form.addEventListener('submit', (event) => {
event.preventDefault();
renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
}
});

buttonNext.addEventListener('click', () => {
searchPokemon += 1;
renderPokemon(searchPokemon);
});

// Renderiza o primeiro Pokémon
renderPokemon(searchPokemon);
