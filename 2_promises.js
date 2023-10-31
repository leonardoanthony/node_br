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

const usuarioPromise = obterUsuario();

//* para manipular o sucesso -> .then()
//! para manipular o erro -> .catch()

usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
            .then(function resolveTelefone(result){
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function(usuarioFone){
        return obterEnderecoAsync(usuarioFone.usuario.id)
            .then(function resolveEndereco(result){
                return {
                    usuario: usuarioFone.usuario,
                    telefone: usuarioFone.telefone,
                    endereco: result
                }
            })
        
    })
    .then(function(resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua} nº${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function(erro){
        console.error('DEU RUIM', erro);
    })



