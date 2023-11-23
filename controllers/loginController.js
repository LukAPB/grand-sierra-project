const PessoasModel = require("../models/pessoasModel");

class LoginController {

    constructor() {

    }

    loginView(req, res) {
        res.render('login/login', { layout: 'login/login' });
    }

    logout(req, res){
        res.clearCookie("usuarioLogado");
        res.redirect('/login');
    }

    /*autenticarUsuario(req, res) {
        if(req.body.inputEmail == "teste@teste.com" 
        && req.body.inputPassword == "12345"){
            res.redirect('/');
        }
        else {
            res.render('login/login', { msgErro: "Usuário ou senha inválidos", layout: 'login/login' })
        }
    }*/

    async autenticar(req, res){
        if(req.body.email != undefined && req.body.senha != undefined){
            let usuario = new PessoasModel();
            usuario = await usuario.autenticarUsuario(req.body.email, req.body.senha);

            if(usuario != null){
                res.cookie('usuarioLogado', usuario.pessoaId);
                res.send({status: true, msg: "Autenticação realizada com sucesso"})
            }
            else{
                res.send({status: false, msg: "Credenciais inválidas"})
            }
        }
        else{
            res.send({status: false, msg: "Credenciais inválidas"})
        }
    }
}

module.exports = LoginController;