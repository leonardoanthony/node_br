const Commander = require('commander');
const Database = require('./database');
const Heroi = require('../Heroi');
async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do herói')
        .option('-p, --poder [value]', 'Poder do herói')
        .option('-i, --id [value]', 'Id do heroi')

        .option('-c, --cadastrar ','Cadastrar um herói')
        .option('-L, --listarTodos ','Listar os heróis')
        .option('-l, --listar [value] ','Recupera herói com id')
        .option('-a, --atualizar [value]', 'Atualiza um heroi pelo id')

        .parse(process.argv);


        const heroi = new Heroi(Commander._optionValues);

    try {

        if(Commander._optionValues.cadastrar){
            const resultado = await Database.cadastrar(heroi);
            if(!resultado){
                console.error('Heroi não foi cadastrado');
                return;
            }
            console.log('Heroi cadastrado com sucesso');
        }

        if(Commander._optionValues.listarTodos){
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if(Commander._optionValues.listar){
            const resultado = await Database.listar(+Commander._optionValues.listar);
            if(!resultado.lenght){
                console.error('Não existe heroi com este id');
                return;
            }
            console.log(resultado);
            return;
        }

        if(Commander._optionValues.remover){
            const resultado = await Database.remover(+Commander._optionValues.id);
            if(!resultado){
                console.error('Não existe heroi com este id');
                return;
            }
            console.log('Heroi excluido com sucesso!');
            return;
        }

        if(Commander._optionValues.atualizar){
            const dado = JSON.stringify(heroi);
            const novoHeroi = JSON.parse(dado);

            const resultado = await Database.atualizar(Commander._optionValues.atualizar, novoHeroi);
            if(!resultado){
                console.error('Não existe heroi com este id');
                return;
            }
            console.log('Heroi atualizado com sucesso!');
            return;
        }
        
        
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

main();