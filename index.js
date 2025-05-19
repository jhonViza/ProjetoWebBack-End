const { connect } = require("./database/MongoConnection");
const Website = require("./classes/Website");
const PalavraChave = require("./classes/PalavraChave");
const Busca = require("./classes/Busca");

async function main(){
    await connect();

    const site = new Website("https://www.exemplo.com","Site Exemplo", "Descrição do site exemplo.");
    await site.salvar();

    const palavra = new PalavraChave("educação");
    palavra.websites.push("https://www.exemplo.com");
    await palavra.salvarOuAtualizar();

    const resultado = [site.url]; // Simula que o site foi retornado na busca
    const busca = new Busca("educação", resultado);
    await busca.salvar();

    const historico = await Busca.historico("educação");
    console.log("Histórico de buscas para 'educação': ", historico);
}

main();