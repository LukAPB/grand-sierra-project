const PessoaJuridicaModel = require("../models/pessoaJuridicaModel")

class pessoasController {

    constructor() {

    }
    
    async listarView(req, res){
        let pessoas = new PessoaJuridicaModel();
        let lista = await pessoas.listarPessoas();

        res.render('Pessoas/listar', { lista: lista, layout: 'layoutInterna' });
    }

    async cadastrarView(req, res) {
        res.render('Pessoas/cadastrar', {layout: 'layoutInterna' })
    }    

}
module.exports = pessoasController;