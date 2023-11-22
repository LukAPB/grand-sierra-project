const express = require('express');
const internaController = require('../controllers/internaController');

class InternaRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new internaController();
        this.#router.get('/', ctrl.listarView);
    }
}

module.exports = InternaRoute;