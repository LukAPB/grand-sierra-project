const NotaFiscalModel = require("../models/notaFiscalModel");
const PessoaModel = require("../models/pessoasModel");
const ProdutoModel = require("../models/produtoModel");
const ProdutosDaNotaModel = require("../models/produtosDaNotaModel");
const PessoaJuridicaModel = require("../models/pessoaJuridicaModel");

class NfController {

    constructor() {

    }
    
    async NfView(req, res){
        let pessoa = new PessoaJuridicaModel();
        let pessoaJuridica = await pessoa.listarPessoas();

        let codigo = new ProdutoModel();
        codigo = await codigo.listarProdutos();

        res.render('NF/notafiscal', { layout: 'layoutInterna', lista: pessoaJuridica, codigo: codigo });
    }

    async gravarNota(req, res){
        let listaProdutos = req.body.listaProdutos;
        
        if(listaProdutos != null && listaProdutos.length > 0) {     
            let cnpj = listaProdutos[0].CNPJ;
            

            let pessoa = new PessoaModel();
            let pessoaJuridica = await pessoa.CNPJ(cnpj);
            // console.log("Teste",pessoaJuridica[0].pessoaId);
            console.log("teste2",pessoaJuridica.pessoaId);

            let nota = new NotaFiscalModel(listaProdutos[0].notaNum, listaProdutos[0].notaValor.replace(",", "."), listaProdutos[0].notaData, pessoaJuridica.pessoaId);
            await nota.gravar();

            for(let i = 0; i < listaProdutos.length; i++){
                let pedidoItem = new ProdutosDaNotaModel(listaProdutos[i].codigoBarras, listaProdutos[i].notaNum, listaProdutos[i].produtoQuantidade, listaProdutos[i].produtoValor);
                await pedidoItem.gravar();

                let produto = new ProdutoModel();
                let codigoBarras = listaProdutos[i].codigoBarras;
                produto = await produto.obterProduto(codigoBarras);
                produto.prodEstoque = parseInt(produto.prodEstoque) + parseInt(listaProdutos[i].produtoQuantidade);
                await produto.gravar();
            }
            
            res.send({msg:"Nota Fiscal gravada com sucesso!", ok: true});
        } else {
            res.send({msg: "Não foi possível gravar a Nota Fiscal!", ok: false});
        }
    }

}
module.exports = NfController;