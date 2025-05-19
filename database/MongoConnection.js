const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

//função assíncrona que se conecta ao MongoDB
async function connect() {
    try{
        await client.connect();
        db = client.db('buscadorWeb');
        console.log("Conectado ao MongoDB");
    } catch(err){
        require('../utils/Logger').log("Erro na conexão com o MongoDB: "+err);
    }
}

function getDB(){
    return db;
}

//exporta as duas funções
module.exports={connect, getDB};