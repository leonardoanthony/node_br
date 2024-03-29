const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
};

describe('🧪 MongoDB Strategy', function() {
    this.timeout(Infinity);

    this.beforeAll(async () => {
        await context.connect();
    })

    it('Verificar Conexão', async () => {
        const expected =  "Conectado";
        const result = await context.isConnected();

        assert.deepEqual(result, expected);
    });

    it('Cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome});
        const result = {nome, poder};

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    })
});