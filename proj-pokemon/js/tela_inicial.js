//estrutura do bloco de pesquisa//

const PokeNome = Document.querySelector('.Nome_Pokemon')
const PokeNumero = Document.querySelector('.Numero_Pokemon')
const PokeImagem = Document.querySelector('.Imagem_Pokemon')
const PokeForms = Document.querySelector('.Form_Pokemon')


const fetchPokemon = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await apiResposta.json();

    console.log(data);
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    PokeNome.innerHTML = data.name;
    PokeNumero.innerHTML = data.id;
    PokeImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    console.log(data);

}

