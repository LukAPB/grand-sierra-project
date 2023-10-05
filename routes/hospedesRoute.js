const express = require('express');
const HospedesController = require('../controllers/hospedesController');

class HospedesRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new HospedesController();
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/listar', ctrl.listarView);
        this.#router.get('/criar', ctrl.criarView);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.get('/alterar', ctrl.alterarView);
        this.#router.post('/criar', ctrl.gravarhospede);
        this.#router.post('/excluir', ctrl.deletarhospede);
        this.#router.post('/alterar', ctrl.alterarhospede);
    }
}

module.exports = HospedesRoute;