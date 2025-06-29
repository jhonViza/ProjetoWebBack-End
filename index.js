const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoConnection = require('./database/MongoConnection');
const authRoutes = require('./routes/authRoutes');
const websiteRoutes = require('./routes/websiteRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
    secret: 'romero223',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

app.use('/', authRoutes);
app.use('/websites', websiteRoutes);

MongoConnection.connect().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
