const express = require('express');
const pessoasController = require('../controllers/pessoasController');

class PessoasRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new pessoasController();
        this.#router.get('/', ctrl.listarView);
    }
}

module.exports = PessoasRoute;