const Database = require('../utils/database');

const conexao = new Database();

class ProdutosDaNotaModel {
    #prodCodigoBarras;
    #nfNumNota;
    #pnQuantidade;
    #pnPreco;

    get prodCodigoBarras() { return this.#prodCodigoBarras; } set prodCodigoBarras(prodCodigoBarras) {this.#prodCodigoBarras = prodCodigoBarras;}
    get nfNumNota() { return this.#nfNumNota; } set nfNumNota(nfNumNota) {this.#nfNumNota = nfNumNota;}
    get pnQuantidade() { return this.#pnQuantidade; } set pnQuantidade(pnQuantidade) {this.#pnQuantidade = pnQuantidade;}
    get pnPreco() { return this.#pnPreco; } set pnPreco(pnPreco) {this.#pnPreco = pnPreco;}
    

    constructor (prodCodigoBarras, nfNumNota, pnQuantidade, pnPreco) {
        this.#prodCodigoBarras = prodCodigoBarras;
        this.#nfNumNota = nfNumNota;
        this.#pnQuantidade = pnQuantidade;
        this.#pnPreco = pnPreco;
    }
}

module.exports = ProdutosDaNotaModel;