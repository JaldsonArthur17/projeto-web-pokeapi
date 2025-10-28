const fetchPokemon = async (pokemon) => {
    const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
}