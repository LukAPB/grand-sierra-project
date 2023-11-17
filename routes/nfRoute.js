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
        this.#router.get('/gerar', ctrl.NfView);
    }
}

module.exports = NfRoute;