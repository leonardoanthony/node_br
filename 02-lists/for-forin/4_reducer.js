const {obterPessoas} = require('./service');

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

async function main(){
    try {
        const {results} = await obterPessoas(`a`);

        // const pesos = results.map(pessoa => parseInt(pessoa.height));
        // const totalPeso = pesos.reduce((anterior, atual) =>  anterior + atual);
        // console.log(`pesos`, pesos);
        // console.log(`totalPeso`, totalPeso);

        const nomes = [
            ['Leonardo', 'Anthony'],
            ['NodeBR', 'Develop']
        ];

        const nomesConcatenados = nomes.meuReduce((anterior, atual) => {
            return anterior.concat(atual);
        }, [])
        .join(', ');

        console.log(`nomesConcatenados`, nomesConcatenados);

    } catch (error) {
        console.error(`erro interno`, error)
    }
}

main();