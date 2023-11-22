class produtoController {

    constructor() {

    }
    
    listarView(req, res){
        res.render('Produto/listar', { layout: 'layoutInterna' });
    }

}
module.exports = produtoController;