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
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrarProduto);
        this.#router.post('/verificaCodigoBarras', ctrl.verificaCodigoBarras);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterarProduto);
        this.#router.post('/excluir', ctrl.excluirProduto);
    }
}

module.exports = ProdutoRoute;