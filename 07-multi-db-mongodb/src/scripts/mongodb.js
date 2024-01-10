//* docker exec -it mongoclient bash
//* mongo mongodb:27017 -u leonardoanthony -p senhasenhamsm --authenticationDatabase herois

//? show dbs -> mostra os bancos
//? use herois -> utiliza o banco herois ou cria se não existir

//? show collections -> mostra as 

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
});


const lead = {
  id_pendencia: "23346",
  id_cliente: "2614577",
  id_matricula: "2614902",
  idCurso: "1",
  origem: "878",
  nome: "Marcelo",
  email: "omarcelo2003@yahoo.com.br",
  fone: "17991084663",
  fone2: "",
  quantidadeInteracoes: "1",
  vendedor: "5252",
};

db.herois.find();
db.herois.find().pretty();

for(let i = 0; i < 79; i++){
    db.leads.insert({
        id_pendencia: "23346",
        id_cliente: "2614577",
        id_matricula: "2614902",
        idCurso: "1",
        origem: "878",
        nome: "Marcelo",
        email: "omarcelo2003@yahoo.com.br",
        fone: "17991084663",
        fone2: "",
        quantidadeInteracoes: "1",
        vendedor: "5252",
      });
}

db.herois.count();

db.herois.findOne();

db.herois.find().limit(100).sort({nome: -1});

db.herois.find({}, {poder: 1, _id: 0});


db.herois.update(
    {_id: ObjectId("659d5c2277eda7a83c33b8cf")}, 
    {nome: 'Mulher Maravilha'}
);

db.herois.update(
    {_id: ObjectId("659d88dc77eda7a83c33b933")}, 
    {$set: {nome: 'Lanterna Verde'}}
);

//* só atualiza o primeiro
db.herois.update(
    {poder: "Velocidade"}, 
    {$set: {poder: 'Super força'}}
);

db.herois.remove({})
db.herois.remove({nome: 'Mulher maravilha'});




