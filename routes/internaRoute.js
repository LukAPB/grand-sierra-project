const express = require('express');
const internaController = require('../controllers/internaController');
const Autenticação = require('../middlewares/autenticacao');


class InternaRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {
        let auth = new Autenticação();

        this.#router = express.Router();
        let ctrl = new internaController();
        this.#router.get('/', auth.verificaUsuarioLogadoAdmin, ctrl.listarView);
    }
}

module.exports = InternaRoute;