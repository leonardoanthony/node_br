const {deepEqual, ok} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

describe('🧪 Suite de manipulação de Herois', () => {


    it(`Deve pesquisar um heroi usando arquivos`, async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultdado] = await database.listar(expected.id);

        deepEqual(resultdado, expected);
    });

    // it('Deve cadastrar um heroi, usando arquivos', async() => {
    //     const expected = DEFAULT_ITEM_CADASTRAR
    //     ok(null, expected);
    // })
});