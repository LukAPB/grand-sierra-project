const Database = require('../utils/database');

const conexao = new Database();

class ReservaModel {
    #reservaPessoaId;
    #reservaDataEntrada;
    #reservaDataSaida;
    #reservaStatus;
    #reservaNum;
    #reservaTacId;

    constructor(reservaPessoaId, reservaDataEntrada, reservaDataSaida, reservaStatus, reservaNum, reservaTacId) {
        this.#reservaPessoaId = reservaPessoaId;
        this.#reservaDataEntrada = reservaDataEntrada;
        this.#reservaDataSaida = reservaDataSaida;
        this.#reservaStatus = reservaStatus;
        this.#reservaNum = reservaNum;
        this.#reservaTacId = reservaTacId;
    }

    async listarReservas() {
        let sql = `SELECT * FROM reserva_hos`;
        let reservas = await conexao.ExecutaComando(sql);

        return reservas;
    }

    async listarAcomodacoes() {
        let sql = `SELECT * FROM tipo_de_acomodacao`;
        let acomodacoes = await conexao.ExecutaComando(sql);

        return acomodacoes;
    }


    async listarReservasHospede(id) {
        let sql = `SELECT * FROM reserva_hos WHERE id = ?`;
        let reservas = await conexao.ExecutaComandoNonQuery(sql, [id]);

        return reservas;
    }

    async gravar() {
        let sql = `INSERT INTO reserva_hos (Pessoas_pessoa_id,res_dataEntrada, res_dataSaida, res_status, res_num, tac_id) VALUES (?, ?, ?, ?, ?, ?)`;
        let valores = [this.#reservaPessoaId, this.#reservaDataEntrada, this.#reservaDataSaida, this.#reservaStatus, this.#reservaNum, this.#reservaTacId];

        let ok = await conexao.ExecutaComando(sql, valores);

        return ok;
    }

  async atualizar() {
        let sql = `UPDATE reserva_hos SET Pessoas_pessoa_id = ?, res_dataEntrada = ?, res_dataSaida = ?, res_status = ?, res_num = ?, tac_id = ? WHERE id = ?`;
        let valores = [this.#reservaPessoaId, this.#reservaDataEntrada, this.#reservaDataSaida, this.#reservaStatus, this.#reservaNum, this.#reservaTacId];

        let ok = await conexao.ExecutaComando(sql, valores);

        return ok;
    }

   async excluir(id) {
        let sql = `DELETE FROM reserva_hos WHERE id = ?`;
        let ok = await conexao.ExecutaComandoNonQuery(sql, [id]);

        return ok;
    }

    async obterReserva(id) {
        let sql = `SELECT * FROM reserva_hos WHERE id = ?`;
        let reserva = await conexao.ExecutaComandoNonQuery(sql, [id]);

        return reserva;
    }   

}

module.exports = ReservaModel;