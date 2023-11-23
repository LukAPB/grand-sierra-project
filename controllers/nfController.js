const NotaFiscalModel = require("../models/notaFiscalModel");
const PessoaJuridicaModel = require("../models/pessoaJuridicaModel")
const ProdutosDaNotaModel = require("../models/produtosDaNotaModel");

class NfController {

    constructor() {

    }
    
    NfView(req, res){
        res.render('NF/notaFiscal', { layout: 'layoutInterna' });
    }

    async gravarNota(req, res){
        let listaProdutos = req.body.listaProdutos;
        
        if(listaProdutos != null && listaProdutos.length > 0) {     
            let cnpj = listaProdutos[0].CNPJ;

            let pessoa = new PessoaJuridicaModel();
            let pessoaJuridica = await pessoa.obterPessoa(cnpj);

            let nota = new NotaFiscalModel(listaProdutos[0].notaNum, listaProdutos[0].notaValor.replace(",", "."), listaProdutos[0].notaData);
            await nota.gravar();

            for(let i = 0; i < listaProdutos.length; i++){
                let pedidoItem = new ProdutosDaNotaModel(listaProdutos[i].codigoBarras, listaProdutos[i].notaNum, listaProdutos[i].produtoQuantidade, listaProdutos[i].produtoValor, pessoaJuridica.pessoaId);

                await pedidoItem.gravar();
            }

            res.send({msg:"Nota Fiscal gravada com sucesso!", ok: true});
        } else {
            res.send({msg: "ERRO", ok: false});
        }
    }

}
module.exports = NfController;