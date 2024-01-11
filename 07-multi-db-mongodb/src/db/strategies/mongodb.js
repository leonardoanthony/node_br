const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}

class MongoDB extends ICrud {
    constructor(){
        super();
        this._herois = null;
        this._connection = null;
    }

    connect(){
        Mongoose.connect(`mongodb://leonardoanthony:senhasenhamsm@localhost:27017/herois`)
        .catch(error => {
            if(!error) return;
            console.log('Falha na conexão!', error)
        });

        this._connection = Mongoose.connection;

        this._connection.once('open', () => true);
        this.defineModel();
    }

    async isConnected(){
        const state = STATUS[this._connection.readyState];

        if(state === "Conectado") return state;

        if(state !== "Conectando") return state;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return STATUS[this._connection.readyState];
    }

    defineModel(){
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

        this._herois = Mongoose.model('herois', heroiSchema);
    }
 
    create(item){
        return this._herois.create(item);
    }

    read(query, skip=0, limit=10){
        return this._herois.find(query).skip(skip).limit(limit);
    }
}

module.exports = MongoDB;