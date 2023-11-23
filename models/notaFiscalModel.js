const Database = require('../utils/database');

const conexao = new Database();

class NotaFiscalModel {
    #nfNumNota;
    #nfValorTotal;
    #nfDataEntrada;

    get nfNumNota() { return this.#nfNumNota; } set nfNumNota(nfNumNota) {this.#nfNumNota = nfNumNota;}
    get nfValorTotal() { return this.#nfValorTotal; } set nfValorTotal(nfValorTotal) {this.#nfValorTotal = nfValorTotal;}
    get nfDataEntrada() { return this.#nfDataEntrada; } set nfDataEntrada(nfDataEntrada) {this.#nfDataEntrada = nfDataEntrada;}
    

    constructor (nfNumNota, nfValorTotal, nfDataEntrada) {
        this.#nfNumNota = nfNumNota;
        this.#nfValorTotal = nfValorTotal;
        this.#nfDataEntrada = nfDataEntrada;
    }

    async gravar(){
        let sql = "insert into NotaFiscal (nf_numNota, nf_valorTotal, nf_dataEntrada) values (?, ?, ?)";

        let valores = [this.#nfNumNota, this.#nfValorTotal, this.#nfDataEntrada]

        return await conexao.ExecutaComandoNonQuery(sql, valores);
    }

}

module.exports = NotaFiscalModel;