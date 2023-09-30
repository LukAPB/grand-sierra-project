
class HomeController {

    constructor() {

    }
    
    homeView(req, res){
        res.render('Home/index', { });
    }

}
module.exports = HomeController;