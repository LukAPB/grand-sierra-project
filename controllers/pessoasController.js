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
        var msg = "";
        if(req.body.razaoSocial != "" && req.body.email != "" && req.body.CEP != "" && 
        req.body.numTelefone  != '' && req.body.logradouro != '' && req.body.CNPJ  != '') {
            let pessoa = new PessoaJuridicaModel(req.body.razaoSocial, req.body.email, req.body.logradouro, req.body.CEP, req.body.numTelefone, req.body.CNPJ, 0);

            let existePessoa = pessoa.obterPessoa(req.body.CNPJ);

            if (existePessoa != null && existePessoa > 0){
                ok = false;
                msg = "CNPJ já cadastrado!"
            }
            else{
                ok = await pessoa.gravar();
                msg = "Pessoa cadastrada com sucesso!"
            }

        }
        else{
            ok = false;
            msg = "Preencha todos os campos corretamente!"
        }

        res.send({ ok: ok , msg: msg})
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

    async alterarView(req, res){
        let pessoa = new PessoaJuridicaModel();

        if(req.params.id != undefined && req.params.id != ""){
            pessoa = await pessoa.obterPessoa(req.params.id);
        }
        res.render("Pessoas/alterar", {pessoa: pessoa, layout: 'layoutInterna'});
    }

    async alterarPessoa(req, res) {
        var ok = true;
        var msg = ""

        if(req.body.razaoSocial != "" && req.body.email != "" && req.body.CEP != '' && req.body.logradouro != '' && req.body.CNPJ != '' && req.body.numTelefone != '') {

            let pessoa = new PessoaJuridicaModel(req.body.razaoSocial, req.body.email, req.body.logradouro, req.body.CEP, req.body.numTelefone, req.body.CNPJ, req.body.id)
            
            let pessoa2 = new PessoaJuridicaModel();
            pessoa2 = await pessoa2.obterPessoa(req.body.CNPJ);

            if (pessoa2 == null){
                ok = await pessoa.gravar();
                msg = "Pessoa alterada com sucesso!"
            }
            else if (pessoa.pessoaId == pessoa2.pessoaId && pessoa.pjCNPJ == pessoa2.pjCNPJ){
                ok = await pessoa.gravar();
                msg = "Pessoa alterada com sucesso!"
            }
            else{
                ok = false;
                msg = "CNPJ já cadastrado!";
            }            
        }
        else{
            ok = false;
            msg = "Preencha todos os campos corretamente!";
        }

        res.send({ ok: ok, msg: msg})
    }

    async excluirPessoa(req, res){
        var ok = true;
        if(req.body.codigo != "") {
            let pessoa = new PessoaJuridicaModel();
            ok = await pessoa.excluir(req.body.codigo);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});

    }

    async filtrar(req, res) {    
        let pessoa = new PessoaJuridicaModel();
        let termo = req.body.termo == "" ? null : req.body.termo;
        let lista = await pessoa.filtrarPessoas(req.body.criterio, termo);

        res.send({lista: lista});
    }

}
module.exports = pessoasController;