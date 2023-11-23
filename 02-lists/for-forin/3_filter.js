const {obterPessoas} = require('./service');

Array.prototype.meuFilter = function (callback) {
    const listaFiltrada = [];
    for(index in this){
        const item = this[index];
        const result = callback(item, index, this)
        if(result){
            listaFiltrada.push(item);
        }
    }

    return listaFiltrada
}

async function main(){
    try {
        const {results} = await obterPessoas(`a`);
        
        //* const familiaLars = results.filter((pessoa) => {
        //*     const result = pessoa.name.toLowerCase().indexOf(`lars`) !== -1;
        //*     return result;
        //* });

        const familiaLars = results.meuFilter((pessoa) => {
            const result = pessoa.name.toLowerCase().indexOf(`lars`) === -1;
            return result;
        })

        const names = familiaLars.map((pessoa) => pessoa.name);

        console.log(`names`, names);

    } catch (error) {
        console.error(`erro interno`, error)
    }
}

main();