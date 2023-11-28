const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião Arqueiro',
    poder: 'flechas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Superman',
    poder: 'Apelação'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity);

    this.beforeAll(async function(){
        await context.connect();
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('PostgresSql Connection', async function() {

        const result = await context.isConected();
        assert.equal(result, true);
    })

    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })

    it('listar', async function(){
        const result = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })

    it('atualizar', async function(){
        const itemAtualizar = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome});
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'SuperMan'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem);
        const itemAtualizado = await context.read({id: itemAtualizar.id})

        assert.deepEqual(result , 1);
        assert.deepEqual(itemAtualizado.nome , novoItem.nome);
    })
});