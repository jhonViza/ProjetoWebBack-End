const express = require('express');
const router = express.Router();

const USUARIO_FIXO = {email: 'admin@teste.com', senha: '123456'};

router.get('/login', (req,res) => res.render('login'));

router.post('/login', (req, res) => {
    const{email, senha} = req.body;
    if(email === USUARIO_FIXO.email && senha === USUARIO_FIXO.senha){
        req.session.usuario = email;
        return res.redirect('/websites/home');
    }
    res.render('login', {erro: 'Credenciais inválidas!'});
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;