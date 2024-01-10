const Mongoose = require('mongoose');

Mongoose.connect(`mongodb://leonardoanthony:senhasenhamsm@localhost:27017/herois`)
    .catch(error => {
        if(!error) return;
        console.log('Falha na conexão!', error)
    });

const connection = Mongoose.connection;

connection.once('open', () => console.log('database rodando!'));


//? const state = connection.readyState;
//? console.log('state', state);

//* 0: Desconectado;
//* 1: Connectado;
//* 2: Conectando;
//* 3: Desconectando;

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true
    },
    insertdAt: {
        type: Date,
        default: new Date(),
    }
});

const model = Mongoose.model('herois', heroiSchema);

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro',
    });

    console.log('resultCadastrar', resultCadastrar);

    const resultListar = await model.find({})

    console.log('resultListar', resultListar);
}

main();



