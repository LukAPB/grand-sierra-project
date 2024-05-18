const Reserva = require('../models/reservaModel');
const PessoaJuridicaModel = require("../models/pessoaJuridicaModel");
const PessoaModel = require("../models/pessoasModel");

class ReservaController {
        
        constructor() {
            
    
        }
        async gravarReserva(req, res){
           
            let pessoa = new PessoaModel();
            let pessoaJuridica = await pessoa.CNPJ(req.body.Pessoas_pessoa_id);
            let reserva = new Reserva(pessoaJuridica.pessoaId, req.body.dataEntrada, req.body.dataSaida, req.body.status, parseInt(req.body.num), parseInt(req.body.tac_id));
            let ok = await reserva.gravar();
    
            if(ok){
                res.send({msg: "Reserva gravada com sucesso!", ok: true});
            }
            else{
                res.send({msg: "Erro ao gravar reserva!", ok: false});
            }
        }
    
        async reservaView(req, res){
            console.log('ReservaView');
            let reserva = new Reserva();
            let pessoa = new PessoaJuridicaModel();
            let pessoaJuridica = await pessoa.listarPessoas();
            let listaA = await reserva.listarAcomodacoes();
            console.log("ListaA",listaA);
            res.render('Reserva/reserva', { layout: 'layoutInterna',lista: pessoaJuridica, listaA: listaA});
        }
    
        async reservaHospede(req, res){
            var ok = true;
            if(req.body.hospedeNome != "" && req.body.hospedeData != "" && req.body.hospedeCEP != "" && 
            req.body.hospedeCPF  != '' ) {
                
                let hospede = new Reserva(req.body.hospedeNome, req.body.hospedeData, req.body.hospedeCEP, req.body.hospedeCPF);
    
                ok = await hospede.gravar(0);
            }
            else{
                ok = false;
            }
    
            res.send({ ok: ok })
        }
    
        async checkoutView(req, res){
            let hospede = new Reserva();
    
            if(req.params.id != undefined && req.params.id != ""){
                hospede = await hospede.obterHospede(req.params.id);
            }
        }
    }

module.exports = ReservaController;