const ICrud = require("./interfaces/interfaceCrud");

const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor(){
        super();
        this._driver = null;
        this._herois = null;
    }

    async create(item){
        const {dataValues} = await this._herois.create(item);
        delete dataValues.id;
        return dataValues;
    }

    async read(query = {}){
        const [result] = await this._herois.findAll({where: query, raw: true});
        return result;
    }

    async update(id, item){
        const result = await this._herois.update(item, {where: {id: id}});
        return result;
    }

    async delete(id){
        const query = id ? { id } : { };
        return this._herois.destroy({where: query});
    }

    async connect(){
        this._driver = new Sequelize(
            'heroes',
            'leonardoanthony',
            'senhasenhamsm',{
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
            }
        );

        await this.defineModel();
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
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
    
        await this._herois.sync();
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