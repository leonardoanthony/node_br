const {deepEqual, ok} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

describe('🧪 Suite de manipulação de Herois', () => {

    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    })

    it(`Deve pesquisar um heroi usando arquivos`, async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultdado] = await database.listar(expected.id);

        deepEqual(resultdado, expected);
    });

    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = {
            id: 2,
            nome: 'Batman',
            poder: 'Rich'
        }
        const resultado = await database.cadastrar(expected);
        const [actual] = await database.listar(expected.id);
        deepEqual(actual, expected);
    });

    it('Deve remover um heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected);
    });
});