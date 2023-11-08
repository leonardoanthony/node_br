const {deepEqual, ok} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

const DEFAULT_ITEM_ATUALIZAR = {
    id: 2,
    nome: 'Lanterna Verde',
    poder: 'Energy'

}

describe('🧪 Suite de manipulação de Herois', () => {

    
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });

    after(async () => {
        await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        await database.remover(DEFAULT_ITEM_ATUALIZAR.id);
    });

   

    it(`Deve pesquisar um heroi usando arquivos`, async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultdado] = await database.listar(expected.id);

        deepEqual(resultdado, expected);
    });

    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(expected);
        const [actual] = await database.listar(expected.id);
        deepEqual(actual, expected);
    });

    it('Deve remover um heroi pelo id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected);
    });

    it('Deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Homem de Ferro',
            poder: 'Rich'
        }
        const novoDado = {
            nome: 'Homem de Ferro',
            poder: 'Rich'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

        deepEqual(resultado, expected);
    });

    // after(async () => {
    //     await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    //     await database.remover(DEFAULT_ITEM_ATUALIZAR.id);
    // })
});