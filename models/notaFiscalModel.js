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

    async gravar(){
        let sql = "insert into Nota_Fiscal (nf_numNota, nf_valorTotal, nf_dataEntrada, pessoa_id) values (?, ?, ?, ?)";

        let valores = [this.#nfNumNota, this.#nfValorTotal, this.#nfDataEntrada, this.#pessoaId]

        return await conexao.ExecutaComandoNonQuery(sql, valores);
    }

}

module.exports = NotaFiscalModel;