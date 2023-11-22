const Database = require('../utils/database');

const conexao = new Database();

class PessoasModel{

    #pessoaId;
    #pessoaNome;
    #pessoaEmail;
    #pessoaLogradouro;
    #pessoaCEP;
    #pessoaNumTelefone;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    get pessoaNome() { return this.#pessoaNome; } set pessoaNome(pessoaNome) {this.#pessoaNome = pessoaNome;}
    get pessoaEmail() { return this.#pessoaEmail; } set pessoaEmail(pessoaEmail) {this.#pessoaEmail = pessoaEmail;}
    get pessoaLogradouro() { return this.#pessoaLogradouro; } set pessoaLogradouro(pessoaLogradouro) {this.#pessoaLogradouro = pessoaLogradouro;}
    get pessoaCEP() { return this.#pessoaCEP; } set pessoaCEP(pessoaCEP) {this.#pessoaCEP = pessoaCEP;}
    get pessoaNumTelefone() { return this.#pessoaNumTelefone; } set pessoaNumTelefone(pessoaNumTelefone) {this.#pessoaNumTelefone = pessoaNumTelefone;}

    constructor (pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone){
        this.#pessoaNome = pessoaNome;
        this.#pessoaEmail = pessoaEmail;
        this.#pessoaLogradouro = pessoaLogradouro;
        this.#pessoaCEP = pessoaCEP;
        this.#pessoaNumTelefone = pessoaNumTelefone
    }
}

module.exports = PessoasModel;