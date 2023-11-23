const ICrud = require("./interfaces/interfaceCrud");

const Sequelize = require('sequelize');

const driver = new Sequelize(
    'heroes',
    'leonardoanthony',
    'senhasenhamsm',{
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
    }
)

class Postgres extends ICrud {
    constructor(){
        super();
        this._driver = null;
        this._herois = null;
        this._connect();
    }

    create(item){
        console.log("O item foi salvo em Postgres")
    }

    _connect(){
        this._driver = new Sequelize(
            'heroes',
            'leonardoanthony',
            'senhasenhamsm',{
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
            }
        )
    }

    async defineModel() {
        this._herois = driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING,
                required: true,
            },
            poder: {
                type: Sequelize.STRING,
                required: true,
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        });
    
        await Herois.sync();
    }

    async isConected(){
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.error('fail!', error);
            return false;
        }
    }
}

module.exports = Postgres;