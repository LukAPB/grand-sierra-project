class pessoasController {

    constructor() {

    }
    
    listarView(req, res){
        res.render('Pessoas/listar', { layout: 'layoutInterna' });
    }

}
module.exports = pessoasController;