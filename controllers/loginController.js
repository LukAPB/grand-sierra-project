class LoginController {

    constructor() {

    }

    loginView(req, res) {
        res.render('login/login', { layout: 'login/login' });
    }

    autenticarUsuario(req, res) {
        if(req.body.inputEmail == "teste@teste.com" 
        && req.body.inputPassword == "12345"){
            res.redirect('/');
        }
        else {
            res.render('login/login', { msgErro: "Usuário ou senha inválidos", layout: 'login/login' })
        }
    }
}

module.exports = LoginController;