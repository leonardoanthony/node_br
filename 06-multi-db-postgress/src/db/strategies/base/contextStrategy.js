const ICrud = require('./../interfaces/interfaceCrud');

class ContextStrategy extends ICrud {
    constructor(strategy){
        super();
        this._database = strategy;
    }

    connect(){
        return this._database.connect();
    }

    create(item){
        return this._database.create(item);
    }
    read(query){
        return this._database.read(query);
    }
    update(id, item){
        return this._database.update(id, item);
    }
    delete(id){
        return this._database.delete(id);
    }
    
    isConected(){
        return this._database.isConected();
    }
}

module.exports = ContextStrategy;