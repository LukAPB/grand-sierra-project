const PessoasModel = require('../models/pessoasModel');

const Database = require('../utils/database');

const conexao = new Database();

class PessoaJuridicaModel extends PessoasModel {
    #pessoaId;
    #pjCNPJ;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    get pjCNPJ() { return this.#pjCNPJ; } set pjCNPJ(pjCNPJ) {this.#pjCNPJ = pjCNPJ;}

    constructor (pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone, pjCNPJ, pessoaId) {
        super(pessoaId, pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone);
        this.#pjCNPJ = pjCNPJ;
        this.#pessoaId = pessoaId;
    }

    async listarPessoas(){

        let sql = 'select * from Pessoas';

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

    async gravar(){
        if(this.#pessoaId == 0){
            let sql = "insert into Pessoas (nome, email, logradouro, CEP, numTelefone, pj_cnpj) values (?, ?, ?, ?, ?, ?)";

            let valores = [super.pessoaNome, super.pessoaEmail, super.pessoaLogradouro, super.pessoaCEP, super.pessoaNumTelefone, this.#pjCNPJ];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            
            let sql = "update Pessoas set nome = ?, email = ?, logradouro = ?, CEP = ?, numTelefone = ?, pj_cnpj = ? where pessoa_id = ?";
            let valores = [super.pessoaNome, super.pessoaEmail, super.pessoaLogradouro, super.pessoaCEP, super.pessoaNumTelefone, this.#pjCNPJ, this.#pessoaId];

            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async obterPessoa(id){
        let sql = "select * from Pessoas where pj_cnpj = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if (rows.length > 0){
       
            let pessoa = new PessoaJuridicaModel();
            pessoa.pessoaId = rows[0]["pessoa_id"];
            pessoa.pessoaNome = rows[0]["nome"];
            pessoa.#pjCNPJ = rows[0]["pj_cnpj"];
            pessoa.pessoaCEP = rows[0]["CEP"];
            pessoa.pessoaEmail = rows[0]["email"];
            pessoa.pessoaLogradouro = rows[0]["logradouro"];
            pessoa.pessoaNumTelefone = rows[0]["numTelefone"];

            return pessoa;
        }
    }
}
module.exports = PessoaJuridicaModel;