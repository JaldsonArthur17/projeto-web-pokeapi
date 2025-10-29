
const listaPokemon = document.querySelector('#lista_pokemon');
const formBusca = document.querySelector('#formBusca');
const inputBusca = document.querySelector('#pesquisa');
const botaoAnterior = document.querySelector('#botao_anterior');
const botaoPosterior = document.querySelector('#botao_posterior');
const botaoFavoritos = document.querySelector('#botao_favoritar');

const mensagemCarregando = document.querySelector('#mensagem_carregando');
const mensagemErro = document.querySelector('#mensagem_erro');
const mensagemVazio = document.querySelector('#mensagem_vazio');

const modal = document.querySelector('#detalhes_modal');
const detalhesContainer = document.querySelector('#detalhes_pokemon');
const fecharModal = document.querySelector('#fechar_modal');

const API_BASE = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const limit = 20;
let mostrandoFavoritos = false;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

async function carregarPokemons() {
    mostrarMensagem('carregando');

    try {
        const resposta = await fetch(`${API_BASE}?limit=${limit}&offset=${offset}`);
        const data = await resposta.json();
        const pokemons = await Promise.all(
            data.results.map(p => fetch(p.url).then(r => r.json()))
        );
        renderizarLista(pokemons);
    } catch (error) {
        mostrarMensagem('erro');
    }
}

function renderizarLista(pokemons) {
    esconderMensagens();
    listaPokemon.innerHTML = '';

    if (pokemons.length === 0) {
        mostrarMensagem('vazio');
        return;
    }

    pokemons.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${p.sprites.front_default}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>#${p.id}</p>
            <button class="botao_fav">${favoritos.includes(p.id) ? '⭐' : '☆'}</button>
        `;

        const favButton = card.querySelector('.botao_fav');
        favButton.addEventListener('click', (e) => {
            e.stopPropagation();
            alternarFavorito(p.id);
            renderizarLista(pokemons);
        });

        card.addEventListener('click', () => mostrarDetalhes(p));

        listaPokemon.appendChild(card);
    });
}

function mostrarDetalhes(pokemon) {
    detalhesContainer.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
        <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
    `;

    modal.classList.remove('hidden');
}

fecharModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

formBusca.addEventListener('submit', async (e) => {
    e.preventDefault();
    const termo = inputBusca.value.trim().toLowerCase();
    if (!termo) return carregarPokemons();

    mostrarMensagem('carregando');

    try {
        const resposta = await fetch(`${API_BASE}/${termo}`);
        if (!resposta.ok) throw new Error('not found');
        const pokemon = await resposta.json();
        renderizarLista([pokemon]);
    } catch {
        mostrarMensagem('vazio');
    }
});

botaoPosterior.addEventListener('click', () => {
    if (!mostrandoFavoritos) {
        offset += limit;
        carregarPokemons();
    }
});

botaoAnterior.addEventListener('click', () => {
    if (offset >= limit && !mostrandoFavoritos) {
        offset -= limit;
        carregarPokemons();
    }
});

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


botaoFavoritos.addEventListener('click', async () => {
    mostrandoFavoritos = !mostrandoFavoritos;

    if (mostrandoFavoritos) {
        botaoFavoritos.textContent = 'Mostrar Todos';
        mostrarMensagem('carregando');

        const pokemons = await Promise.all(
            favoritos.map(id => fetch(`${API_BASE}/${id}`).then(r => r.json()))
        );
        renderizarLista(pokemons);
    } else {
        botaoFavoritos.textContent = 'Mostrar Pokémons Favoritos ⭐';
        carregarPokemons();
    }
});


function mostrarMensagem(tipo) {
    esconderMensagens();
    if (tipo === 'carregando') mensagemCarregando.classList.remove('hidden');
    if (tipo === 'erro') mensagemErro.classList.remove('hidden');
    if (tipo === 'vazio') mensagemVazio.classList.remove('hidden');
}

function esconderMensagens() {
    mensagemCarregando.classList.add('hidden');
    mensagemErro.classList.add('hidden');
    mensagemVazio.classList.add('hidden');
}

carregarPokemons();
