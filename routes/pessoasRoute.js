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
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrarPessoas);
        this.#router.post('/verificaCNPJ', ctrl.verificaCNPJ);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterarPessoa);
        this.#router.post('/excluir', ctrl.excluirPessoa);
    }
}

module.exports = PessoasRoute;