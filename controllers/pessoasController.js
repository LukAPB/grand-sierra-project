const PessoaJuridicaModel = require("../models/pessoaJuridicaModel");

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

    async verificaCNPJ(req, res){
        if(req.body.cnpj != ""){
            let pessoa = new PessoaJuridicaModel()
            pessoa = await pessoa.obterPessoa(req.body.cnpj);
            
            if (pessoa != null){
                let pessoaJson = {
                    pessoaId: pessoa.pessoaId,
                    pessoaNome: pessoa.pessoaNome,
                    pjCNPJ: pessoa.pjCNPJ
                }

                res.send({ok: true, pessoa: pessoaJson});
            } else {
                res.send({ok: false, msg: "CNPJ não cadastrado"});
            }
        }
    }

}
module.exports = pessoasController;