const Database = require('../utils/database');

const conexao = new Database();

class HospedeModel {

    #hospedeId;
    #hospedeNome;
    #hospedeData;
    #hospedeCEP;
    #hospedeCPF;
 

    get hospedeId() { 
        return this.#hospedeId;
    }

    set hospedeId(hospedeId) {
        this.#hospedeId = hospedeId;
    }

    get hospedeNome() {
        return this.#hospedeNome;
    }

    set hospedeNome(hospedeNome) {
        this.#hospedeNome = hospedeNome;
    }

    get hospedeData() {
        return this.#hospedeData;
    }

    set hospedeData(hospedeData){
        this.#hospedeData = hospedeData;
    }

    get hospedeCEP() {
        return this.#hospedeCEP;
    }

    set hospedeCEP(hospedeCEP) {
        this.#hospedeCEP = hospedeCEP;
    }

    get hospedeCPF(){
        return this.#hospedeCPF;
    }

    set hospedeCPF(hospedeCPF) {
        this.#hospedeCPF = hospedeCPF;
    }



    constructor(hospedeId, hospedeNome, hospedeData, hospedeCEP, hospedeCPF) {
        this.#hospedeId = hospedeId;
        this.#hospedeNome = hospedeNome;
        this.#hospedeData = hospedeData;
        this.#hospedeCEP = hospedeCEP;
        this.#hospedeCPF = hospedeCPF;
        
    }

    async buscarhospede(id){
        let sql = "select * from tb_hospede where usu_id = ?"
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            return new HospedeModel(rows[0]["hos_id"], rows[0]["hos_nome"], rows[0]["hos_data"], rows[0]["hos_CEP"], rows[0]["usu_CPF"]);
        }
        return null;
    }

    async listarhospedes() {
        let sql = 'select * from tb_hospede';
        let rows = await conexao.ExecutaComando(sql);

        let listahospedes = [];

        for(let i = 0; i< rows. length; i++){
            let row = rows[i];
            listahospedes.push(
                new HospedeModel(row['hos_id'], row['hos_nome'], row['hos_data'], row['hos_CEP'], row['hos_CPF'])
            );
        }

        return listahospedes;
    }

    async gravarhospede() {
        let result = false;
        if(this.#hospedeId == 0){
            let sql = "insert into tb_hospede (hos_nome, hos_data, hos_CEP, hos_CPF) values (?, ?, ?, ?)";
            let valores = [this.#hospedeNome, this.#hospedeData, this.#hospedeCEP, this.#hospedeCPF];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update tb_hospede set hos_nome = ?, hos_data = ?, hos_CEP = ?, hos_CPF = ?, where hos_id = ?";
            let valores = [this.#hospedeNome, this.#hospedeData, this.#hospedeCEP, this.#hospedeCPF, this.#hospedeId];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }

        return result;

    }

    async deletarhospede(hospedeId) {
        let sql = "delete from tb_hospede where hos_id = ?"
        let valores = [hospedeId];

        let result = conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = HospedeModel;