//estrutura do bloco de pesquisa//

const PokeNome = Document.querySelector('.Nome_Pokemon')
const PokeNumero = Document.querySelector('.Numero_Pokemon')
const PokeImagem = Document.querySelector('.Imagem_Pokemon')
const PokeForms = Document.querySelector('.Form_Pokemon')
const input = Document.querySelector('.input_pesquisa')

const botaoAnterior = document.querySelector('.botao_anterior');
const botao_posterior = document.querySelector('.botao_posterior');



const fetchPokemon = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase());

    if (apiResposta.status == 200) {

        const data = await apiResposta.json();
    return data;

    }
}

const renderPokemon = async (pokemon) => {

    PokeNome.innerHTML = 'carregando...';
    PokeNumero.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        PokeNome.innerHTML = data.name;
        PokeNumero.innerHTML = data.id;
        PokeImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value='';

    } else {
        PokeNome.innerHTML = "Não encontrado."
        PokeNumero.innerHTML = '';
    }

}

form.addEventListener('submit', (Event) => {
    Event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});


renderPokemon('1');
