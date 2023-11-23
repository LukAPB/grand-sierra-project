const PerfilModel = require("../../models/archive/perfilModel");
const HospedeModel = require("../../models/archive/hospedeModel");

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
        res.render('archive/Hospedes/criar', { lista: listaPerfil, layout: 'layoutInterna' });
    }

    async alterarView(req, res) {
        let hospedeModel = new HospedeModel();
        if(req.params != null && req.params.id != null){
            let hospedeId = req.params.id;           
            hospedeModel = await hospedeModel.buscarhospede(hospedeId);
        }
        let perfilModel = new PerfilModel();
        let listaPerfil = await perfilModel.listar();
        res.render('archive/Hospedes/alterar', { lista: listaPerfil, hosAlteracao: hospedeModel, layout: 'layoutInterna' });
    }

    async listarView(req, res) {
        let hospede = new HospedeModel();
        let listahospedes = await hospede.listarhospedes();
        res.render('archive/Hospedes/listar', { lista: listahospedes, layout: 'layoutInterna' });
    }

    async listarhospedes(req, res){
        let hospede = new HospedeModel();
        let listahospedes = await hospede.listarhospedes();

        let listaHos = [];

        for(let i = 0; i<listahospedes.length; i++){
            listaHos.push({
                id: listahospedes[i].hospedeId,
                nome: listahospedes[i].hospedeNome,
                dataNasc: listahospedes[i].hospedeData,
                hospedeCPF: listahospedes[i].hospedeCPF,
                hospedeCEP: listahospedes[i].hospedeCEP,
            })
        }

        res.send({ lista: listaHos, ok: true })
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