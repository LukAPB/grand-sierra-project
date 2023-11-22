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

    async cadastrarPessoas(req, res) {
        var ok = true;
        if(req.body.razaoSocial != "" && req.body.email != "" && req.body.CEP != "" && 
        req.body.numTelefone  != '' && req.body.logradouro != '' && req.body.CNPJ  != '') {
            let pessoa = new PessoaJuridicaModel(req.body.razaoSocial, req.body.email, req.body.logradouro, req.body.CEP, req.body.numTelefone, req.body.CNPJ, 0);

            ok = await pessoa.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

}
module.exports = pessoasController;