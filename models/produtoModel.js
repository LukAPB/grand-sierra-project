const Database = require('../utils/database');

const conexao = new Database();

class ProdutoModel {
    #prodCodigoBarras;
    #prodNome;
    #prodEstoque;
    #prodPreco;

    get prodCodigoBarras() { return this.#prodCodigoBarras; } set prodCodigoBarras(prodCodigoBarras) {this.#prodCodigoBarras = prodCodigoBarras;}
    get prodNome() { return this.#prodNome; } set prodNome(prodNome) {this.#prodNome = prodNome;}
    get prodEstoque() { return this.#prodEstoque; } set prodEstoque(prodEstoque) {this.#prodEstoque = prodEstoque;}
    get prodPreco() { return this.#prodPreco; } set prodPreco(prodPreco) {this.#prodPreco = prodPreco;}
    

    constructor (prodCodigoBarras, prodNome, prodEstoque, prodPreco) {
        this.#prodCodigoBarras = prodCodigoBarras;
        this.#prodNome = prodNome;
        this.#prodEstoque = prodEstoque;
        this.#prodPreco = prodPreco;
    }

    async listarProdutos(){

        let sql = 'select * from Produto';

        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];

                listaRetorno.push(new ProdutoModel(row['prod_codBarras'], 
                row['prod_nome'], row['prod_estoque'], row['prod_preco']));
            }
        }

        return listaRetorno;
    }
}

module.exports = ProdutoModel;