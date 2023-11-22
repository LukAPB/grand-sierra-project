const ProdutoModel = require("../models/produtoModel");

class produtoController {

    constructor() {

    }
    
    async listarView(req, res){
        let produto = new ProdutoModel();
        let lista = await produto.listarProdutos();

        res.render('Produto/listar', { lista: lista, layout: 'layoutInterna' });
    }

}
module.exports = produtoController;