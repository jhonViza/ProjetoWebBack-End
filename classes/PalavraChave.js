const{getDB} = require("../database/MongoConnection");
const Logger = require("../utils/Logger");

class PalavraChave{
    constructor(texto){
        if(!texto)throw new Error('Texto da palavra-chave é obrigatório');
        this.texto = texto.toLowerCase();
        this.websites = [];
    }

    async salvarOuAtualizar(){
        try{
            const db = getDB();
            const existente = await db.collection("palavras_chave").findOne({texto: this.texto});

            if(existente){
                await db.collection("palavras_chave").updateOne(
                    {texto: this.texto}, {$addToSet: {websites:{$each: this.websites}}}
                );
            } else{
                await db.collection("palavras_chave").insertOne(this);
            }
        }catch(err){
            Logger.log("Erro ao salvar ou atualizar palavra-chave: "+err.message);
        }
    }

    static async buscar(texto){
        try{
            const db = getDB();
            return await db.collection("palavras_chave").findOne({texto: texto.toLowerCase()});
        }catch(err){
            Logger.log("Erro ao buscar palavra-chave: "+err.message);
        }
    }

    static async deletar(texto) {
        try{
            const db = getDB();
            await db.collection("palavras_chave").deleteOne({texto: texto.toLowerCase()});
        }catch (err) {
            Logger.log("Erro ao deletar palavra-chave: "+err.message);
        }
    }
}

module.exports = PalavraChave;
