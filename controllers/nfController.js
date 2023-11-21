class NfController {

    constructor() {

    }
    
    NfView(req, res){
        res.render('NF/notafiscal', { layout: 'layoutInterna' });
    }

}
module.exports = NfController;