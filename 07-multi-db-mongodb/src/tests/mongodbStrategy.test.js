const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

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
});