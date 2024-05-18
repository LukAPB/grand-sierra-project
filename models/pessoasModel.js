const Database = require('../utils/database');

const conexao = new Database();

class PessoasModel{

    #pessoaId;
    #pessoaSenha;
    #pessoaNome;
    #pessoaEmail;
    #pessoaLogradouro;
    #pessoaCEP;
    #pessoaNumTelefone;

    get pessoaId() { return this.#pessoaId; } set pessoaId(pessoaId) {this.#pessoaId = pessoaId;}
    get pessoaSenha() { return this.#pessoaSenha; } set pessoaSenha(pessoaSenha) {this.#pessoaSenha = pessoaSenha;}
    get pessoaNome() { return this.#pessoaNome; } set pessoaNome(pessoaNome) {this.#pessoaNome = pessoaNome;}
    get pessoaEmail() { return this.#pessoaEmail; } set pessoaEmail(pessoaEmail) {this.#pessoaEmail = pessoaEmail;}
    get pessoaLogradouro() { return this.#pessoaLogradouro; } set pessoaLogradouro(pessoaLogradouro) {this.#pessoaLogradouro = pessoaLogradouro;}
    get pessoaCEP() { return this.#pessoaCEP; } set pessoaCEP(pessoaCEP) {this.#pessoaCEP = pessoaCEP;}
    get pessoaNumTelefone() { return this.#pessoaNumTelefone; } set pessoaNumTelefone(pessoaNumTelefone) {this.#pessoaNumTelefone = pessoaNumTelefone;}

    constructor (pessoaId, pessoaNome, pessoaEmail, pessoaLogradouro, pessoaCEP, pessoaNumTelefone, pessoaSenha){
        this.#pessoaId = pessoaId;
        this.#pessoaNome = pessoaNome;
        this.#pessoaSenha = pessoaSenha;
        this.#pessoaEmail = pessoaEmail;
        this.#pessoaLogradouro = pessoaLogradouro;
        this.#pessoaCEP = pessoaCEP;
        this.#pessoaNumTelefone = pessoaNumTelefone
    }

    async obterUsuario(id){
        let sql = `select * from Pessoas where pessoa_id = ?`;
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            let usuario = new PessoasModel();
            usuario.pessoaId = rows[0]['pessoa_id'];
            usuario.pessoaNome = rows[0]['nome'];
            usuario.#pessoaSenha = rows[0]['senha'];
            usuario.pessoaEmail = rows[0]['email'];
            return usuario;
        }

        return null

    }

    async autenticarUsuario(email, senha){

        let sql = "select * from Pessoas where email = ? and senha = ?";

        let valores = [email, senha];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            return new PessoasModel(rows[0]['pessoa_id'], rows[0]['nome'], rows[0]['senha'], rows[0]['email']);
        }

        return null
    }

    async CNPJ(cnpj){
        let sql = "select * from Pessoas where pj_cnpj = ?";

        let valores = [cnpj];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0){
            return new PessoasModel(rows[0]['pessoa_id'], rows[0]['nome'], rows[0]['senha'], rows[0]['email']);
        }

        return null
    }
}

module.exports = PessoasModel;