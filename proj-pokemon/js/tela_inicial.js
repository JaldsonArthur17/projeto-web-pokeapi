const PokeNome = document.querySelector('.Nome_Pokemon');
const PokeNumero = document.querySelector('.Numero_Pokemon');
const PokeImagem = document.querySelector('.Imagem_Pokemon');

const PokeForms = document.querySelector('.Form_Pokemon');
const input = document.querySelector('#pesquisa');
const botaoAnterior = document.querySelector('#botao_anterior');
const botaoPosterior = document.querySelector('#botao_posterior');

let procurarPokemon = 1;

// Busca na API
const fetchPokemon = async (pokemon) => {
    try {
        const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (apiResposta.status === 200) {
            const data = await apiResposta.json();
            return data;
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return null;
    }
};

// Renderiza Pokémon na tela
const renderPokemon = async (pokemon) => {
    PokeNome.innerHTML = 'Carregando...';
    PokeNumero.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
        PokeImagem.style.display = 'block';
        PokeNome.innerHTML = data.name.toUpperCase();
        PokeNumero.innerHTML = `#${data.id}`;
        PokeImagem.src = `https://img.pokemondb.net/artwork/large/${data.name.toLowerCase()}.jpg`;
        input.value = '';
        procurarPokemon = data.id;
    } else {
        PokeImagem.style.display = 'none';
        PokeNome.innerHTML = "Não encontrado.";
        PokeNumero.innerHTML = '';
    }
};

// Evento de busca
PokeForms.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Botões de navegação
botaoAnterior.addEventListener('click', () => {
    if (procurarPokemon > 1) {
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon);
    }
});

botaoPosterior.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);
