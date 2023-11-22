const PessoasModel = require('../models/pessoasModel');

const Database = require('../utils/database');

const conexao = new Database();

class PessoaJuridicaModel extends PessoasModel {
    #pessoaId;
    #pjCNPJ;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    get pjCNPJ() { return this.#pjCNPJ; } set pjCNPJ(pjCNPJ) {this.#pjCNPJ = pjCNPJ;}

    constructor (pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone, pjCNPJ, pessoaId) {
        super(pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone);
        this.#pjCNPJ = pjCNPJ;
        this.#pessoaId = pessoaId;
    }

    async listarPessoas(){

        let sql = 'select * from Pessoas p inner join PessoaJuridica pj on p.pessoa_id = pj.pessoa_id';

        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];

                listaRetorno.push(new PessoaJuridicaModel(row['nome'], 
                row['email'], row['logradouro'], row['CEP'], 
                row['numTelefone'], row['pj_cnpj'], row['pessoa_id']));
            }
        }

        return listaRetorno;
    }
}

module.exports = PessoaJuridicaModel;