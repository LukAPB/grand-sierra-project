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

    async gravar(cadastro){
        if(cadastro == 0){
            let sql = "insert into Produto (prod_codBarras, prod_nome, prod_estoque, prod_preco) values (?, ?, ?, ?)";

            let valores = [this.#prodCodigoBarras, this.#prodNome, this.#prodEstoque, this.#prodPreco];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            
            let sql = "update Produto set prod_nome = ?, prod_estoque = ?, prod_preco = ? where prod_codBarras = ?";
            let valores = [this.#prodNome, this.#prodEstoque, this.#prodPreco, this.#prodCodigoBarras, ];

            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async obterProduto(id){
        let sql = "select * from Produto where prod_codBarras = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0){
       
            let produto = new ProdutoModel();
            produto.#prodNome = rows[0]["prod_nome"];
            produto.#prodEstoque = rows[0]["prod_estoque"];
            produto.#prodPreco = rows[0]["prod_preco"];
            produto.#prodCodigoBarras = rows[0]["prod_codBarras"];

            return produto;
        }
    }

    async excluir(codigo){
        let sql = "delete from Produto where prod_codBarras = ?"
        let valores = [codigo];

        var result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = ProdutoModel;