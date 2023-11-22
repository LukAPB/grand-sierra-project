import {PessoasModel} from './pessoasModel.js'

const conexao = new Database();

class PessoaJuridicaModel extends PessoasModel {
    #pessoaId;
    #pjCNPJ;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    get pjCNPJ() { return this.#pjCNPJ; } set pjCNPJ(pjCNPJ) {this.#pjCNPJ = pjCNPJ;}

    constructor (pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone, pjCNPJ) {
        super(pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone);
        this.#pjCNPJ = pjCNPJ;
    }
}

module.exports = PessoaJuridicaModel;