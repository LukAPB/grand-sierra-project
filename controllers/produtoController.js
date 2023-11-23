const ProdutoModel = require("../models/produtoModel");

class produtoController {

    constructor() {

    }
    
    async listarView(req, res){
        let produto = new ProdutoModel();
        let lista = await produto.listarProdutos();

        res.render('Produto/listar', { lista: lista, layout: 'layoutInterna' });
    }

    async cadastrarView(req, res) {
        res.render('Produto/cadastrar', {layout: 'layoutInterna' })
    }

    async cadastrarProduto(req, res) {
        var ok = true;
        if(req.body.nome != "" && req.body.codigoBarras != "" && req.body.estoque != "" && 
        req.body.preco  != '' ) {
            
            let produto = new ProdutoModel(req.body.codigoBarras, req.body.nome, req.body.estoque, req.body.preco.replace(',', '.'));

            ok = await produto.gravar(0);
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async verificaCodigoBarras(req, res){
        if(req.body.codigoBarras != ""){
            let produto = new ProdutoModel();
            produto = await produto.obterProduto(req.body.codigoBarras);
            
            if (produto != null){
                let produtoJson = {
                    prodCodBarras: produto.prodCodigoBarras,
                    prodNome: produto.prodNome,
                    prodEstoque: produto.prodEstoque,
                    prodPreco: produto.prodPreco
                }
                res.send({ok: true, produto: produtoJson});
            } else {
                res.send({ok: false, msg: "Produto não cadastrado"});
            }
        }
    }
}
module.exports = produtoController;