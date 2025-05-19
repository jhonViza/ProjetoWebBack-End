const{getDB} = require("../database/MongoConnection");
const Logger = require("../utils/Logger");

class Website{
    constructor(url,titulo,descricao){
        if(!url) throw new Error("URL é obrigatória");
        this.url = url;
        this.titulo = titulo || "";
        this.descricao = descricao || "";
        this.dataIndexacao = new Date(); 
    }

    async salvar(){
        try{
            const db = getDB();
            await db.collection("Websites").insertOne(this);
        } catch(err){
            Logger.log("Erro ao salvar website: "+err.message);
        }
    }

    static async buscaPorUrl(url){
        try{
            const db = getDB();
            return await db.collection('websites').findOne({urls});
        } catch(err){
            Logger.log("Erro ao buscar website: "+err.message);
        }
    }

    static async deletarPorUrl(url){
        try{
            const db = getDB();
            await db.collection("websites").deleteOne({url});
        }catch(err){
            Logger.log("Erro ao deletar website: "+err.message);
        }
    }
}

module.exports = Website;