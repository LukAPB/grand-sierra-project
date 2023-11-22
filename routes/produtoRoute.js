const express = require('express');
const produtoController = require('../controllers/produtoController');

class ProdutoRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new produtoController();
        this.#router.get('/', ctrl.listarView);
    }
}

module.exports = ProdutoRoute;