const { connect } = require("./database/MongoConnection");
const Website = require("./classes/Website");
const PalavraChave = require("./classes/PalavraChave");
const Busca = require("./classes/Busca");

async function main(){
    await connect();

    const site = new Website("https://www.exemplo.com","Site Exemplo", "Descrição do site exemplo.");
    await site.salvar();

    await site.atualizar("https://www.exemploatualizado.com", "Site Atualizado", "Nova descrição do site.");

    const palavra = new PalavraChave("educação");
    palavra.websites.push("https://www.exemploatualizado.com");
    await palavra.salvarOuAtualizar();

    const resultado = [site.url];
    const busca = new Busca("educação", resultado);
    await busca.salvar();

    const historico = await Busca.historico("educação");
    console.log("Histórico de buscas para 'educação': ", historico);
}

main();
