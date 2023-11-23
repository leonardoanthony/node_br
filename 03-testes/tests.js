const assert = require('assert');
const {obterPessoas} = require('./service');

const nock = require('nock');

//? instalamos o pacote nock, para simular requisições

describe('Star Wars Tests', function() {

    this.beforeAll(() => {
        const response = {
            count:1,
            next:null,
            previous:null,
            results:[{
                name:"R2-D2",
                height:"96",
                mass:"32",
                hair_color:"n/a",
                skin_color:"white, blue",
                eye_color:"red",
                birth_year:"33BBY",
                gender:"n/a",
                homeworld:"https://swapi.dev/api/planets/8/",
                films:["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],
                species:["https://swapi.dev/api/species/2/"],
                vehicles:[],
                starships:[],
                created:"2014-12-10T15:11:50.376000Z",
                edited:"2014-12-20T21:17:50.311000Z",
                url:"https://swapi.dev/api/people/3/"
            }]
        }

        nock('https://swapi.dev/api/people')
        .get('/?search=r2-d2&format=json')
        .reply(200, response);

        const response2 = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
              {
                "name": "Darth Vader",
                "height": "202",
                "mass": "136",
                "hair_color": "none",
                "skin_color": "white",
                "eye_color": "yellow",
                "birth_year": "41.9BBY",
                "gender": "male",
                "homeworld": "https://swapi.dev/api/planets/1/",
                "films": [
                  "https://swapi.dev/api/films/1/",
                  "https://swapi.dev/api/films/2/",
                  "https://swapi.dev/api/films/3/",
                  "https://swapi.dev/api/films/6/"
                ],
                "species": [
                  
                ],
                "vehicles": [
                  
                ],
                "starships": [
                  "https://swapi.dev/api/starships/13/"
                ],
                "created": "2014-12-10T15:18:20.704000Z",
                "edited": "2014-12-20T21:17:50.313000Z",
                "url": "https://swapi.dev/api/people/4/"
              }
            ]
          }

          nock('https://swapi.dev/api/people')
        .get('/?search=vader&format=json')
        .reply(200, response2);
    });

    it('🤖 deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{nome: 'R2-D2', peso: '96'}];
        const nomeBase = `r2-d2`;

        const resultado = await obterPessoas(nomeBase);

        assert.deepEqual(resultado, expected);
    });

    it('🤖 deve buscar o darth vader com o formato correto', async () => {
        const expected = [{nome: 'Darth Vader', peso: '202'}];
        const nomeBase = `vader`;

        const resultado = await obterPessoas(nomeBase);

        assert.deepEqual(resultado, expected);
    })
});