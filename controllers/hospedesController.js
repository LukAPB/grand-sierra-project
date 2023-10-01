const PerfilModel = require("../models/perfilModel");
const HospedeModel = require("../models/hospedeModel");

class HospedesController {

    constructor() {

    }

    async deletarhospede(req, res){
        let ok = false;
        if(req.body.hospedeId != null && req.body.hospedeId > 0){
            let hospedeModel = new HospedeModel();
            ok = hospedeModel.deletarhospede(req.body.hospedeId);
        }
        res.send({ok: ok})
    }

    async criarView(req, res) {
        //chame o método que lista os perfis
        let perfilModel = new PerfilModel();
        let listaPerfil = await perfilModel.listar();
        res.render('Hospedes/criar', { lista: listaPerfil });
    }

    async alterarView(req, res) {
        let hospedeModel = new HospedeModel();
        if(req.params != null && req.params.id != null){
            let hospedeId = req.params.id;           
            hospedeModel = await hospedeModel.buscarhospede(hospedeId);
        }
        let perfilModel = new PerfilModel();
        let listaPerfil = await perfilModel.listar();
        res.render('Hospedes/alterar', { lista: listaPerfil, usuAlteracao: hospedeModel });
    }

    async listarView(req, res) {
        let hospede = new HospedeModel();
        let listahospedes = await hospede.listarhospedes();
        res.render('Hospedes/listar', { lista: listahospedes });
    }

    async listarhospedes(req, res){
        let hospede = new HospedeModel();
        let listahospedes = await hospede.listarhospedes();

        let listaUsu = [];

        for(let i = 0; i<listahospedes.length; i++){
            listaUsu.push({
                id: listahospedes[i].hospedeId,
                nome: listahospedes[i].hospedeNome,
                dataNasc: listahospedes[i].hospedeData,
                hospedeCPF: listahospedes[i].hospedeCPF,
                hospedeCEP: listahospedes[i].hospedeCEP
            })
        }

        res.send({ lista: listaUsu, ok: true })
    }

    async alterarhospede(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.nome != null && req.body.dataNasc != null  && req.body.hospedeCEP != null && req.body.hospedeCPF != null) {
                if(req.body.hospedeCEP > 0) {
                    let hospede = new hospedeModel(req.body.id, req.body.nome, req.body.dataNasc, req.body.hospedeCPF, req.body.hospedeCEP);
                    ok = hospede.gravarhospede();
                }
            }
        }

        res.send({ ok: ok})
    }

    async gravarhospede(req, res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.nome != null && req.body.dataNasc != null &&  req.body.hospedeCEP != null && req.body.hospedeCPF != null) {
                if( req.body.hospedeCEP > 0) {
                    let hospede = new hospedeModel(0, req.body.nome, req.body.dataNasc,  req.body.hospedeCPF, req.body.hospedeCEP);
                    ok = hospede.gravarhospede();
                }
            }
        }

        res.send({ ok: ok})
    }
}

module.exports = HospedesController;