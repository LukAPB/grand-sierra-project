class internaController {

    constructor() {

    }
    
    listarView(req, res){
        res.render('Interna/interna', { layout: 'layoutInterna' });
    }

}
module.exports = internaController;