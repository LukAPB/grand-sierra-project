const PessoasModel = require("../models/pessoasModel");

class Autenticação{

    async verificaUsuarioLogadoAdmin(req, res, next){

        if(req.headers.cookie != undefined && req.headers.cookie.includes('usuarioLogado')){
            let id = req.cookies.usuarioLogado;
            let usuario = new PessoasModel();
            usuario = await usuario.obterUsuario(id);
            if(usuario.pessoaId == 1){
                res.locals.usuarioLogado = usuario;
                next();
            }
            else
                res.redirect('/login');
        }
        else{
            res.redirect('/login');
        }
    }



}

module.exports = Autenticação;