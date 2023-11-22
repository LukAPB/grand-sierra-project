const Database = require('../utils/database');

const conexao = new Database();

class NotaFiscalModel {
    #nfNumNota;
    #nfValorTotal;
    #nfDataEntrada;
    #pessoaId;

    get nfNumNota() { return this.#nfNumNota; } set nfNumNota(nfNumNota) {this.#nfNumNota = nfNumNota;}
    get nfValorTotal() { return this.#nfValorTotal; } set nfValorTotal(nfValorTotal) {this.#nfValorTotal = nfValorTotal;}
    get nfDataEntrada() { return this.#nfDataEntrada; } set nfDataEntrada(nfDataEntrada) {this.#nfDataEntrada = nfDataEntrada;}
    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    

    constructor (nfNumNota, nfValorTotal, nfDataEntrada, pessoaId) {
        this.#nfNumNota = nfNumNota;
        this.#nfValorTotal = nfValorTotal;
        this.#nfDataEntrada = nfDataEntrada;
        this.#pessoaId = pessoaId;
    }
}

module.exports = NotaFiscalModel;