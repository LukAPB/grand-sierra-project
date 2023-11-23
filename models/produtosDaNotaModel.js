const Database = require('../utils/database');

const conexao = new Database();

class ProdutosDaNotaModel {
    #prodCodigoBarras;
    #nfNumNota;
    #pnQuantidade;
    #pnPreco;
    #pessoaId;

    get prodCodigoBarras() { return this.#prodCodigoBarras; } set prodCodigoBarras(prodCodigoBarras) {this.#prodCodigoBarras = prodCodigoBarras;}
    get nfNumNota() { return this.#nfNumNota; } set nfNumNota(nfNumNota) {this.#nfNumNota = nfNumNota;}
    get pnQuantidade() { return this.#pnQuantidade; } set pnQuantidade(pnQuantidade) {this.#pnQuantidade = pnQuantidade;}
    get pnPreco() { return this.#pnPreco; } set pnPreco(pnPreco) {this.#pnPreco = pnPreco;}
    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    

    constructor (prodCodigoBarras, nfNumNota, pnQuantidade, pnPreco, pessoaId) {
        this.#prodCodigoBarras = prodCodigoBarras;
        this.#nfNumNota = nfNumNota;
        this.#pnQuantidade = pnQuantidade;
        this.#pnPreco = pnPreco;
        this.#pessoaId = pessoaId;
    }

    async gravar(){

        let sql = "insert into ProdutosDaNota (prod_codBarras, nf_numNota, pn_quantidade, pn_preco, pessoaId) values (?, ?, ?, ?, ?)";

        let valores = [this.#prodCodigoBarras, this.#nfNumNota, this.#pnQuantidade, this.#pnPreco, this.#pessoaId];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;

    }
}

module.exports = ProdutosDaNotaModel;