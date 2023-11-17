class NfController {

    constructor() {

    }
    
    NfView(req, res){
        res.render('NF/gerar', { });
    }

}
module.exports = NfController;