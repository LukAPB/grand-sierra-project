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
}

module.exports = ProdutoModel;