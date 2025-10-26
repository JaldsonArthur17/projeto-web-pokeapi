const imagem = document.getElementById("imagem")
console.log(imagem)

async function funcaoAssincrona() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/pokemon/1", {
        method: "GET",
    });

    const dados = requisicao.json();
    console.log(dados);
    return requisicao;
}

console.log(funcaoAssincrona());
console.log("flsd")