//? 0 recuperar usuario
//? 1 recuperar telefone com id do usuario
//? 2 recuperar endereço com id do usuario

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback){
    setTimeout(function() {
        return callback(null,{
            telefone: '29834019',
            ddd: 81
        })
    }, 2000)
}

function obterEndereco(idUsuari0, callback){
    setTimeout(function() {
        return callback(null,{
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 3000)
}

obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('DEU RUIM em USUARIO', error)
        return
    }

    obterTelefone(usuario.id, function resolverTelefone(error, telefone){
        if(error){
            console.error('DEU RUIM em USUARIO', error)
            return
        }
    
        obterEndereco(usuario.id, function resolverEndereco(error, endereco){
            if(error){
                console.error('DEU RUIM em USUARIO', error)
                return
            }
        
            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${endereco.rua} - nº ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        
        })
    
    })

});
