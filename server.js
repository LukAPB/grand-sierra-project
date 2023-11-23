//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const HomeRoute = require('./routes/homeRoute');
const LoginRoute = require('./routes/loginRoute');
const HospedesRoute = require('./routes/archive/hospedesRoute');
const PessoasRoute = require('./routes/pessoasRoute');
const NfRoute = require('./routes/nfRoute');
const InternaRoute = require('./routes/internaRoute');
const ProdutoRoute = require('./routes/produtoRoute');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))

//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');

//Configuração de onde ficará nossas views
app.set('views', './views');


//define um title generico para todas as nossas páginas
// a variavel title será chamada no nosso arquivo layout na tag title
app.locals.title = "Grand Sierra Resort";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);

//definindo as rotas que o nosso sistema vai reconhecer através da url do navegador
let homeRota = new HomeRoute();
app.use('/', homeRota.router)
let loginRota = new LoginRoute();
app.use('/login', loginRota.router);
let hospedeRota = new HospedesRoute();
app.use('/archive/Hospedes', hospedeRota.router);
let nfRota = new NfRoute();
app.use('/NF', nfRota.router);
let pessoasRota = new PessoasRoute();
app.use('/Pessoas', pessoasRota.router);
let internaRota = new InternaRoute();
app.use('/interna', internaRota.router);
let produtoRota = new ProdutoRoute();
app.use('/Produto', produtoRota.router);



//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
