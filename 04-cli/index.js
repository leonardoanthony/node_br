const Commander = require('commander');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-c, --cadastrar', "Cadastrar um herói")
        Commander.parse(process.argv);


    try{
        if(Commander.cadastrar){
            console.log(Commander);
            console.log('aaaa');
        }
    }catch(error){
        console.error('DEU RUIM');
    }
}   

main();