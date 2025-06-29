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

    static async deletarPorTermo(termo){
        try{
            const db = getDB();
            const resultado = await db.collection("buscas").deleteMany({
                termo: termo.toLowerCase()
            });
            console.log(`Foram deletadas ${resultado.deletedCount} buscas com o termo '${termo}'.`);
        } catch(err){
            Logger.log("Erro ao deletar buscas: " + err.message);
        }
    }

    static async buscar(termo){
        if (!termo || termo.trim() === ""){
            return[];
        }
        try {
            const db = getDB();
            const palavra = termo.toLowerCase();

            const resultados = await db.collection("websites")
            .find({ palavras: { $elemMatch: { $regex: `^${palavra}$`, $options: "i" } } })
            .toArray();

            const buscaObj = new Busca(palavra, resultados);
            await buscaObj.salvar();
            
            return resultados;
        } catch (err) {
            Logger.log("Erro ao buscar websites: " + err.message);
            return [];
        }
    }
}

module.exports = Busca;
