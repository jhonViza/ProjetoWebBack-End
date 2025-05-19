const{getDB} = require("../database/MongoConnection");
const Logger = require("../utils/Logger");

class Busca{
    constructor(termo, resultado = []){
        if(!termo) throw new Error("Termo da busca é obrigatório");
        this.termo = termo.toLowerCase();
        this.data = new Date();
        this.resultado = resultado;
    }

    async salvar() {
        try{
            const db = getDB();
            await db.collection("buscas").insertOne(this);
        }catch(err){
            Logger.log("Erro ao salvar busca: "+err.message);
        }  
    }

    static async historico(termo){
        try{
            const db = getDB();
            const buscas = await db.collection("buscas")
            .find({termo: termo.toLowerCase()})
            .toArray();

            return buscas;
        }catch(err){
            Logger.log("Erro ao buscar histórico de buscas: "+err.message);
        }
    }
}

module.exports = Busca;