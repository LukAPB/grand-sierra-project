class NfController {

    constructor() {

    }
    
    NfView(req, res){
        res.render('NF/notaFiscal', { layout: 'layoutInterna' });
    }

}
module.exports = NfController;