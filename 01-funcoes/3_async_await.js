//? 0 recuperar usuario
//? 1 recuperar telefone com id do usuario
//? 2 recuperar endereço com id do usuario

//? Importamos um modulo interno do node.js
const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    //! Quando der problema -> reject(erro)
    //* Quando der certo -> resolve
    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function(){
            //! return reject(new Error('DEU RUIM DE VERDADE'));
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
            })
        }, 1000);

    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function() {
            return resolve({
                telefone: '29834019',
                ddd: 81
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(function() {
        return callback(null,{
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 3000)
}


async function main(){
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);

        const [telefone, endereco] = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        console.log(`
             Nome: ${usuario.nome}
             Endereco: ${endereco.rua} nº${endereco.numero}
             Telefone: (${telefone.ddd}) ${telefone.telefone}
         `);
         console.timeEnd('medida-promise');
    } catch(error){
        console.error('DEU RUIM', error);
    }
}

main();