const express = require('express');
const NfController = require('../controllers/nfController');

class NfRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new NfController();
        this.#router.get('/notafiscal', ctrl.NfView);
        this.#router.post('/gravarnota', ctrl.gravarNota);
    }
}

module.exports = NfRoute;