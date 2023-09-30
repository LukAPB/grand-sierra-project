class LoginController {

    constructor() {

    }

    loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    autenticarUsuario(req, res) {
        if(req.body.inputEmail == "teste@teste.com" 
        && req.body.inputPassword == "12345"){
            res.redirect('/');
        }
        else {
            res.render('login/index', { msgErro: "Usuário ou senha inválidos", layout: 'login/index' })
        }
    }
}

module.exports = LoginController;