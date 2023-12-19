const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-c, --cadastrar', "Cadastrar um herói")
        .option('-L, --listarTodos', "Listar todos os heróis")
        .option('-l, --listar [value]', "Listar herói pelo ID")
        .option('-r, --remover [value]', "Remove herói pelo ID")
        .option('-a, --atualizar [value]', "Atualiza herói pelo ID")

        .parse(process.argv);

        const heroi = new Heroi(Commander._optionValues);


    try{
        if(Commander._optionValues.cadastrar){
            const resultado = await Database.cadastrar(heroi);
            if(!resultado){
                console.error('#Erro ao cadastrar herói');
                return;
            }

            console.log('Herói cadastrado com sucesso');
        }

        if(Commander._optionValues.listarTodos){
            const resultado = await Database.listar();

            if(!resultado){
                console.error('#Erro ao listar hérois');
                return;
            }
            console.log(resultado);
        }

        if(Commander._optionValues.listar){
            const resultado = await Database.listar(+Commander._optionValues.listar);

            if(!resultado){
                console.error('#Erro ao listar hérois');
                return;
            }
            console.log(resultado);
        }

        if(Commander._optionValues.remover){
            const resultado = await Database.remover(+Commander._optionValues.remover);

            if(!resultado){
                console.error("#Não existe heroi com este ID");
                return;
            }

            console.log('Heroi excluído com sucesso');
        }

        if(Commander._optionValues.atualizar){
            const idParaAtualizar = Commander._optionValues.atualizar;

            const dado = JSON.stringify(heroi);
            const novoHeroi = JSON.parse(dado);

            const resultado = await Database.atualizar(idParaAtualizar, novoHeroi);

            if(!resultado){
                console.error('Não foi possível atualizar herói');
                return;
            }

            console.log('Atualizado com sucesso');
        }
    }catch(error){
        console.error('DEU RUIM', error);
    }
}   

main();