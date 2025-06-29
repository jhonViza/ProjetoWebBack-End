const express = require('express');
const Website = require('../classes/Website');
const Busca = require('../classes/Busca');
const router = express.Router();

function autenticar(req, res, next){
    if (req.session.usuario) return next();
    res.redirect('/login');
}

router.get('/home', autenticar, (req, res) => {
    res.render('home', { sucesso: null, erro: null });
});

router.post('/cadastrar', autenticar, async (req, res)=>{
    const {url, palavras} = req.body;
    if (!url || !palavras){
        return res.render('home', {erro: 'Todos os campos são obrigatórios!'});
    }

    const listaPalavras = palavras.split(',').map(p => p.trim());
    const site = new Website(url, listaPalavras);
    await site.salvar();

    res.render('home', {sucesso: 'Website cadastrado com sucesso!'});
});

router.get('/buscar', autenticar, async(req, res)=>{
    const {palavra} = req.query;

    if (!palavra || palavra.trim() === '') {
        return res.render('resultados', { resultados: [], erro: 'Termo da busca é obrigatório' });
    }

    const resultados = await Busca.buscar(palavra);

    res.render('resultados', { resultados, erro: null });
});

module.exports = router;