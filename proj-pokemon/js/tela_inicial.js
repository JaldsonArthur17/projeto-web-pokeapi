// estrutura do bloco de pesquisa //

const PokeNome = document.querySelector('.Nome_Pokemon');
const PokeNumero = document.querySelector('.Numero_Pokemon');
const PokeImagem = document.querySelector('.Imagem_Pokemon');

const PokeForms = document.querySelector('.Form_Pokemon');
const input = document.querySelector('#pesquisa');
const botaoAnterior = document.querySelector('#botao_anterior');
const botao_posterior = document.querySelector('#botao_posterior');

let procurarPokemon = 1;

// buscando o pokemon na API
const fetchPokemon = async (pokemon) => {
const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

if (apiResposta.status === 200) {
        const data = await apiResposta.json();
        return data;
    }
};
const renderPokemon = async (pokemon) => {
PokeNome.innerHTML = 'Carregando...';
PokeNumero.innerHTML = '';

const data = await fetchPokemon(pokemon);

if (data) {
    PokeImagem.style.display = 'block';
    PokeNome.innerHTML = data.name;
    PokeNumero.innerHTML = data.id;

    const nomeCorrigido = data.name.toLowerCase();
    PokeImagem.src = `https://img.pokemondb.net/artwork/large/${nomeCorrigido}.jpg`;

    input.value = '';
    procurarPokemon = data.id;
    } else {
        PokeImagem.style.display = 'none';
        PokeNome.innerHTML = 'Não encontrado.';
        PokeNumero.innerHTML = '';
    }
};

// Eventos de pesquisa e navegação
PokeForms.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

botaoAnterior.addEventListener('click', () => {
    if (procurarPokemon > 1) {
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon);
    }
});

botao_posterior.addEventListener('click', () => {
procurarPokemon += 1;
renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);
